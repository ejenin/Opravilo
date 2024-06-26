using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Opravilo.API.Models.Auth;
using Opravilo.API.Options;
using Opravilo.Application.Interfaces.Services;

namespace Opravilo.API.Auth
{
    public class UserManager : IUserManager
    {
        private readonly IUserService _userService;
        private readonly ITokenGenerator _tokenGenerator;
        private readonly ITokenValidationParametersCreator _tokenParametersCreator;
        private readonly JwtAuthOptions _authOptions;
        
        public UserManager(IUserService userService, ITokenGenerator tokenGenerator, 
            ITokenValidationParametersCreator tokenParametersCreator, JwtAuthOptions authOptions)
        {
            _userService = userService;
            _tokenGenerator = tokenGenerator;
            _authOptions = authOptions;
            _tokenParametersCreator = tokenParametersCreator;
        }
        
        public AuthenticationResult Register(string login, string displayName, string hashedPassword)
        {
            var registrationResult = _userService.RegisterUser(login, displayName, hashedPassword);

            if (!registrationResult.IsSuccess)
            {
                return Fail(registrationResult.Errors.First());
            }

            var user = registrationResult.CreatedUser;
            
            return Authenticate(displayName, user.Id);
        }

        public AuthenticationResult Authenticate(string login, string hashedPassword)
        {
            var user = _userService.FindUser(login, hashedPassword);

            if (user == null)
            {
                return Fail("Failed to find user!");
            }

            return Authenticate(user.DisplayName, user.Id);
        }

        public bool UserExists(string vkId)
        {
            return _userService.FindUser(vkId) != null;
        }

        public AuthenticationResult AuthenticateVkontakte(string vkId)
        {
            var user = _userService.FindUser(vkId);
            return Authenticate(user.DisplayName, user.Id);
        }

        public AuthenticationResult CreateAndAuthenticate(string vkId, string givenName, string surname)
        {
            var user = _userService.CreateVkUser(givenName, surname, vkId);
            return Authenticate(user.DisplayName, user.Id);
        }

        public AuthenticationResult RefreshToken(string refreshToken)
        {
            var savedToken = _userService.FindToken(refreshToken);
            var now = DateTime.UtcNow;
            
            if (savedToken.RefreshToken != refreshToken)
            {
                return Fail("Refresh token invalid!");
            }
            
            if (now.CompareTo(savedToken.ExpirationDate) > 0)
            {
                return Fail("Refresh token expired!");
            }

            return Authenticate(savedToken.User.DisplayName, savedToken.User.Id);
        }

        private AuthenticationResult Authenticate(string displayName, long userId)
        {
            var token = _tokenGenerator.GetToken(displayName, userId);
            var refreshToken = _tokenGenerator.GetRefreshToken();

            var refreshTokenExpiration = DateTime.Now.AddMinutes(_authOptions.RefreshLifetime);
            
            // Пока - один юзер = один рефреш токен
            _userService.CleanRefreshTokens(userId);
            _userService.SaveRefreshToken(userId, refreshToken, refreshTokenExpiration);
            
            return new AuthenticationResult()
            {
                IsSuccess = true,
                RefreshToken = refreshToken,
                Token = token
            };
        }

        private AuthenticationResult Fail(string reason)
        {
            return new AuthenticationResult()
            {
                IsSuccess = false,
                Errors = new List<string>()
                {
                    reason
                }
            };
        }
    }
}