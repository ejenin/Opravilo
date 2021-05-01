using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Opravilo.DataAccess.Dto;
using Opravilo.DataAccess.EntityFramework.Models;
using Opravilo.DataAccess.Repositories;

namespace Opravilo.DataAccess.EntityFramework.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public UserDto FindUser(string login, string passwordHash)
        {
            var user = _context.Users.FirstOrDefault(u => u.Login == login && 
                                                          u.PasswordHash == passwordHash);

            if (user == null)
            {
                return null;
            }

            return new UserDto()
            {
                Id = user.Id,
                Login = user.Login,
                Email = user.Email
            };
        }

        public UserDto AddUser(string login, string email, string passwordHash)
        {
            var now = DateTime.Now;
            var user = new UserModel()
            {
                Login = login,
                PasswordHash = passwordHash,
                Email = email,
                ChangedDate = now,
                CreatedDate = now
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return new UserDto()
            {
                Id = user.Id,
                Login = login
            };
        }

        public void SaveRefreshToken(long userId, string refreshToken, DateTime expirationTime)
        {
            var now = DateTime.Now;

            var tokenModel = new RefreshTokenModel()
            {
                UserId = userId,
                RefreshToken = refreshToken,
                ExpirationDate = expirationTime,
                ChangedDate = now,
                CreatedDate = now
            };

            _context.RefreshTokens.Add(tokenModel);
            _context.SaveChanges();
        }

        public RefreshTokenDto FindRefreshToken(long userId)
        {
            var user = _context.Users
                .Include(u => u.RefreshTokens)
                .FirstOrDefault(u => u.Id == userId);

            var token = user.RefreshTokens.FirstOrDefault();

            if (token == null)
            {
                return null;
            }

            return new RefreshTokenDto()
            {
                ExpirationDate = token.ExpirationDate,
                RefreshToken = token.RefreshToken
            };
        }

        public void CleanRefreshTokens(long userId)
        {
            var user = _context.Users
                .Include(u => u.RefreshTokens)
                .FirstOrDefault(u => u.Id == userId);
            
            user.RefreshTokens.Clear();

            _context.SaveChanges();
        }

        public bool CredentialsAvailable(string login, string email)
        {
            return !_context.Users
                .Any(u => u.Email == email || u.Login == login);
        }
    }
}