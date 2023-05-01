using System.IO;

namespace ApiGateway.FileUpload.Services
{
    public class LocalFileStorage
    {
        private IConfiguration _configuration;
        private IWebHostEnvironment _env;

        public LocalFileStorage(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        private string GenerateRandomFilePath(string subFolder, string extension)
        {
            var directory = Path.Combine(_env.WebRootPath, subFolder);
            if (!Directory.Exists(directory))
                Directory.CreateDirectory(directory);
            return Path.Combine(_env.WebRootPath, subFolder, Path.GetFileNameWithoutExtension(Path.GetRandomFileName())+$".{extension}");
        }

        private string CreateAccessUrl(string filePath)
        {
            return Path.GetRelativePath(_env.WebRootPath, filePath);
        }

        /// <summary>
        /// Stores the file
        /// </summary>
        /// <param name="file">the actual file content</param>
        /// <param name="category">this is the name of subfolder in which the file will be stored</param>
        /// <returns>the access url as string</returns>
        public async Task<string> StoreFile(IFormFile file, string category)
        {
            var filePath = GenerateRandomFilePath(category, file.FileName);
            using var fileStreem = File.Create(filePath);
            await file.CopyToAsync(fileStreem);
            return CreateAccessUrl(filePath);
        }
    }
}
