namespace ApiGateway.Questions.Dtos
{
    public class AssociateFileRequest
    {
        public IFormFile File { get; set; }
        public int DraftId { get; set; }
    }
}
