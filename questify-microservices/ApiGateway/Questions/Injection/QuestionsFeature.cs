using ApiGateway.Questions.Services;
using System.Collections;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class QuestionsFeature
    {
        public static IServiceCollection AddQuestionsFeature(this IServiceCollection services)
        {
            return services
                .AddScoped<DraftingService>()
                .AddScoped<QuestionsService>()
                .AddScoped<AnswersService>()
                .AddScoped<CommentsService>()
                .AddScoped<DraftPermissionChecker>();
        }
    }
}
