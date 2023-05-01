using ApiGateway.Memberships.Services;
using System.Runtime.CompilerServices;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class MembershipFeatureExtension
    {
        public static IServiceCollection AddMembershipFeature(this IServiceCollection services)
        {
            return services
                .AddScoped<MembershipService>()
                .AddScoped<InvitationService>()
                .AddScoped<MembershipPermissioner>()
                .AddScoped<MembershipAccessor>();
        }
    }
}
