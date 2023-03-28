using ApiGateway.Accounts.Entities;
using ApiGateway.Auth.Dtos;
using ApiGateway.Database;
using Microsoft.AspNetCore.Identity;

namespace ApiGateway.Auth.Services
{

    public class UserAuthenticator
    {

        private AppDbContext _dbContext { get; set; }

        public UserAuthenticator(AppDbContext dbCtx)
        {
            _dbContext = dbCtx;
        }

        public Task<User> AuthenticateWithCredentials(UserCredentials credentials)
        {
            var hasher = new PasswordHasher<User>();
            var user = _dbContext.Users.Where(u =>
                u.Username == credentials.Username).First();
            hasher.VerifyHashedPassword(user, user.PasswordHash, credentials.Password);
            return Task.FromResult(user);
        }
    }
}
