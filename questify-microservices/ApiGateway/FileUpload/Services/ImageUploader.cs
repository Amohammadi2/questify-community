using ApiGateway.Database;

namespace ApiGateway.FileUpload.Services
{
    /// <summary>
    /// Adds image signature validation on top of file uploader.
    /// Use This to securely upload images
    /// </summary>
    public class ImageUploader : FileUploader
    {
        private ImageSignatureValidator _signatureValidator { get; set; }

        public ImageUploader
        (
            LocalFileStorage storage,
            IConfiguration config,
            ImageSignatureValidator signatureValidator,
            AppDbContext dbContext
        ) : base(storage, config, dbContext)
        {
            _signatureValidator = signatureValidator;
        }

        private void AssertFileSignature(IFormFile file)
        {
            _signatureValidator.AssertSignature(file);
        }

        protected override void AssertFileValidity(IFormFile file)
        {
            base.AssertFileValidity(file);
            AssertFileSignature(file);
        }
    }
}
