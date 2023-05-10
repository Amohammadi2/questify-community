using ApiGateway.Database;
using ApiGateway.FileUpload.Entities;
using ApiGateway.FileUpload.Exceptions;

namespace ApiGateway.FileUpload.Services
{
    public class FileUploader
    {

        protected AppDbContext _dbContext { get; set; }
        protected LocalFileStorage _storage { get; set; }
        protected IConfiguration _config { get; set; }

        public FileUploader(LocalFileStorage storage, IConfiguration config, AppDbContext dbContext)
        {
            _storage = storage;
            _config = config;
            _dbContext = dbContext;
        }

        protected void AssertFileLength(IFormFile file)
        {
            if (file.Length == 0)
                throw new ArgumentException("The file received is empty");
            
            var maxLength = _config.GetValue<long>("FileUpload:MaxFileSize");
            if (file.Length > maxLength)
                throw new FileTooLargeException(
                    $"Expected maximum of {maxLength} bytes but received {file.Length}");
        }

        protected virtual void AssertFileValidity(IFormFile file)
        {
            AssertFileLength(file);
        }

        public virtual async Task<FileDetails> UploadFile(IFormFile file, string category)
        {
            AssertFileValidity(file);
            var fileUrl = await _storage.StoreFile(file, category);
            var fileDetails = new FileDetails
            {
                fileUrl = fileUrl,
            };
            await _dbContext.FileDetails.AddAsync(fileDetails);
            await _dbContext.SaveChangesAsync();
            await _dbContext.Entry(fileDetails).ReloadAsync();
            return fileDetails;
        }

    }
}
