using ApiGateway.Accounts.Dtos;
using ApiGateway.Accounts.Entities;
using ApiGateway.Accounts.Validators;
using ApiGateway.Database;
using ApiGateway.Utils;
using System.ComponentModel.DataAnnotations;
using System.Data.Common;

namespace ApiGateway.Accounts.Services
{
    public class UserRegisterer
    {
        private ILogger<User> _logger { get; set; }
        private AppDbContext _dbCtx { get; set; }
        private UserValidator _userValidator { get; set; }

        public UserRegisterer(AppDbContext dbCtx, UserValidator userValidator, ILogger<User> logger)
        {
            _dbCtx = dbCtx;
            _userValidator = userValidator;
            _logger = logger;
        }

        public ServiceResult<User> RegisterUser(AccountRegistrationRequest registrationRequest)
        {
            var newUser = new User
            {
                Username = registrationRequest.Username,
                PasswordHash = registrationRequest.Password,
                Email = registrationRequest.Email
            };
            var result = _userValidator.Validate(newUser);
            if (result.IsValid)
            {
                try
                {
                    _dbCtx.Users.Add(newUser);
                    _dbCtx.SaveChanges();
                    return new ServiceResult<User> { Payload = newUser };
                }
                catch(DbException e)
                {
                    _logger.LogError(e.Message, e);
                    return new ServiceResult<User>
                    {
                        Errors = { new ServiceError { Code="DB_OPERATION_ERR", Message="Failed to save data to database" } }
                    };
                }
            }
            else
            {
                return new ServiceResult<User>
                {
                    Errors = result.Errors
                        .Select(e => new ServiceError { Code=e.ErrorCode, Message=e.ErrorMessage }).ToList()
                };
            }
        }
    }
}
