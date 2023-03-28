using ApiGateway.Accounts.Services;
using ApiGateway.Accounts.Validators;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class AccountsExtension
    {
        public static IServiceCollection AddAccountsFeature(this IServiceCollection services)
        {
            services.AddScoped<UserValidator>();
            services.AddScoped<AccountManagerService>();
            return services;
        }
    }
}
