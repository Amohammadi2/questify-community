using ApiGateway.Communities.Services;
using ApiGateway.Communities.Validators;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class CommunitiesFeature
    {
        public static IServiceCollection AddCommunitiesFeature(this IServiceCollection services)
        {
            return services
                .AddScoped<CommunityValidator>()
                .AddScoped<CommunityService>()
                .AddScoped<CommunityPermissioner>();
        }
    }
}
