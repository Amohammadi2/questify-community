using ApiGateway.FileUpload.Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class FileUploadFeatureExtension
    {
        public static IServiceCollection AddFileUploadFeature(this IServiceCollection services) => services
            .AddScoped<FileUploader>()
            .AddScoped<ImageUploader>()
            .AddScoped<ImageSignatureValidator>()
            .AddScoped<LocalFileStorage>();
    }
}
