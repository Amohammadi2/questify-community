using ApiGateway.FileUpload.Exceptions;

namespace ApiGateway.FileUpload.Services
{
    public class ImageSignatureValidator
    {

        private static Dictionary<string, List<byte[]>> _signatures = new Dictionary<string, List<byte[]>>
        {
            { ".png", new List<byte[]>
            {
                new byte[] { 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, }
            }},
            { ".jpeg", new List<byte[]>
            {
                new byte[] { 0xFF, 0xD8, 0xFF, 0xE0 },
                new byte[] { 0xFF, 0xD8, 0xFF, 0xE2 },
                new byte[] { 0xFF, 0xD8, 0xFF, 0xE3 },
            }},
            { ".jpg", new List<byte[]>
            {
                new byte[] { 0xFF, 0xD8, 0xFF, 0xE0 },
                new byte[] { 0xFF, 0xD8, 0xFF, 0xE2 },
                new byte[] { 0xFF, 0xD8, 0xFF, 0xE3 },
            }},
        };

        public void AssertSignature(IFormFile file)
        {
            string fileExt = Path.GetExtension(Path.GetFileName(file.FileName)).ToLowerInvariant();
            bool isExtensionValid = _signatures.TryGetValue(fileExt, out var possibleSignatures);
            if (!isExtensionValid)
            {
                throw new InvalidExtentionException("extension: " + fileExt + " is invalid as an image extension");
            }
            using (var reader = new BinaryReader(file.OpenReadStream()))
            {
                var headerBytes = reader.ReadBytes(possibleSignatures.Max(s => s.Length));
                var mathcesAnySignature = possibleSignatures.Any(s => s.Take(headerBytes.Length).SequenceEqual(headerBytes));
                if (!mathcesAnySignature)
                {
                    throw new SignatureMismatchException("The content of the file doesn't match with the file extension");
                }
            }
        }
    }
}
