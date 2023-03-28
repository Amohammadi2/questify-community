using ApiGateway.Accounts.Entities;
using ApiGateway.Accounts.Exceptions;
using ApiGateway.Database;
using ApiGateway.Utils;
using System.Data.Common;

namespace ApiGateway.Accounts.Services
{
    public class AccountManagerService
    {
        private AppDbContext _dbContext { get; set; }
        private ILogger _logger;

        public AccountManagerService(AppDbContext dbContext, ILogger<User> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public void ActivateAccountByEmail(string email)
        {
            var user = _dbContext.Users.Where(u => u.Email == email).First();
            if (user == null)
                throw new UserNotFoundException("Could not find the user by provided email: "+email);
            user.isVerified = true;
            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
        }
    }
}
