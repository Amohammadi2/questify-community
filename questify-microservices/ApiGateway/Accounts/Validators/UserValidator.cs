using ApiGateway.Accounts.Entities;
using FluentValidation;

namespace ApiGateway.Accounts.Validators
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(u => u.Username).NotNull().NotEmpty().MinimumLength(3);
            RuleFor(u => u.PasswordHash).NotNull().NotEmpty();
            RuleFor(u => u.Email).NotNull().NotEmpty().EmailAddress();
        }
    }
}
