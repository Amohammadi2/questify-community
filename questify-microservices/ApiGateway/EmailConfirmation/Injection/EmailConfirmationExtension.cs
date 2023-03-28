using ApiGateway.EmailConfirmation.Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class EmailConfirmationExtension
    {
        public static IServiceCollection AddEmailConfirmationFeature(this IServiceCollection services)
        {
            services.AddScoped<EmailConfirmationService>();
            return services;
        }
    }
}
