using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Opravilo.API.Auth;
using Opravilo.API.Auth.External;
using Opravilo.API.Models.Auth;
using Opravilo.API.Models.Requests;
using Opravilo.API.Models.Responses.Account;
using Opravilo.API.Options;

namespace Opravilo.API.Controllers
{
    [Authorize]
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserManager _authManager;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IExternalAuthProvider _externalAuthProvider;
        private readonly JwtAuthOptions _authOptions;
        
        public AccountController(IUserManager authManager, IPasswordHasher passwordHasher, JwtAuthOptions authOptions, IExternalAuthProvider externalAuthProvider)
        {
            _authManager = authManager;
            _passwordHasher = passwordHasher;
            _authOptions = authOptions;
            _externalAuthProvider = externalAuthProvider;
        }

        [AllowAnonymous]
        [HttpGet("loginVK")]
        public async Task<AuthenticationResponse> LoginVk(string code)
        {
            var externalInfo = await _externalAuthProvider.Validate(code, ExternalProviderType.Vkontakte);
            var userExists = _authManager.UserExists(externalInfo.user_id);

            if (userExists)
            {
                var authResult = _authManager.AuthenticateVkontakte(externalInfo.user_id);
                AppendCookie(authResult);
                return ToResponse(authResult);
            }
            
            var credentials = await _externalAuthProvider.GetUserInfo(externalInfo.user_id, externalInfo.access_token, ExternalProviderType.Vkontakte);
            var result = _authManager.CreateAndAuthenticate(credentials.id.ToString(), credentials.first_name, credentials.last_name);
            
            AppendCookie(result);
            return ToResponse(result);
        }
        
        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<AuthenticationResponse> Login(
            [FromBody] LoginRequest request)
        {
            var hashedPassword = _passwordHasher.HashPassword(request.Password);
            var result = _authManager.Authenticate(request.Login, hashedPassword);

            if (result.IsSuccess)
            {
                AppendCookie(result);
                return Ok(ToResponse(result));
            }
            
            return Unauthorized(ToResponse(result));
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public AuthenticationResponse RegisterUser(
            [FromBody] RegistrationRequest request)
        {
            var hashedPassword = _passwordHasher.HashPassword(request.Password);
            var result = _authManager.Register(request.Login, request.DisplayName, hashedPassword);
            if (result.IsSuccess)
            {
                AppendCookie(result);
            }
            
            return ToResponse(result);
        }

        [AllowAnonymous]
        [HttpPost("refresh")]
        public ActionResult<RefreshTokenResponse> RefreshToken()
        {
            var refresh = HttpContext.Request.Cookies["X-REFRESH-TOKEN"];
            
            var result = _authManager.RefreshToken(refresh);

            if (result.IsSuccess)
            {
                AppendCookie(result);
            }
            else
            {
                Logout();
                return Unauthorized(new RefreshTokenResponse() { IsSuccess = false });
            }
                
            return Ok(new RefreshTokenResponse() { IsSuccess = true });
        }

        [HttpPost("logout")]
        public void Logout()
        {
            // todo: clean refresh tokens from db
            HttpContext.Response.Cookies.Delete("X-AUTH-TOKEN");
            HttpContext.Response.Cookies.Delete("X-REFRESH-TOKEN");
            HttpContext.Response.Cookies.Delete("X-AUTH-STATE");
        }

        private AuthenticationResponse ToResponse(AuthenticationResult result)
        {
            return new AuthenticationResponse()
            {
                Errors = result.Errors,
                Token = result.Token,
                IsSuccess = result.IsSuccess
            };
        }

        private void AppendCookie(AuthenticationResult result)
        {
            // todo: decide cookie lifetime - mb options ?
            HttpContext.Response.Cookies.Append("X-AUTH-TOKEN", result.Token, new CookieOptions()
            {
                MaxAge = TimeSpan.FromSeconds(_authOptions.Lifetime),
                HttpOnly = true
            });
            HttpContext.Response.Cookies.Append("X-REFRESH-TOKEN", result.RefreshToken, new CookieOptions()
            {
                MaxAge = TimeSpan.FromMinutes(_authOptions.RefreshLifetime + 1440),
                Path = "api/account/refresh",
                HttpOnly = true
            });
            HttpContext.Response.Cookies.Append("X-AUTH-STATE", "true", new CookieOptions()
            {
                MaxAge = TimeSpan.FromMinutes(_authOptions.RefreshLifetime + 1440),
                HttpOnly = false
            });
        }
    }
}