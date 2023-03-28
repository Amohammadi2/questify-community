using ApiGateway.Communities.Entities;
using FluentValidation;

namespace ApiGateway.Communities.Validators
{
    public class CommunityValidator : AbstractValidator<Community>
    {
        public CommunityValidator()
        {
            RuleFor(c => c.Name).NotNull().NotEmpty().MinimumLength(3);
            RuleFor(c => c.Description).MaximumLength(512);
            RuleFor(c => c.OwnerId).NotEmpty().NotNull();
        }
    }
}
