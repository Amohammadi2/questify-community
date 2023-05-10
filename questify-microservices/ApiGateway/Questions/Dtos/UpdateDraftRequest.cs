namespace ApiGateway.Questions.Dtos
{
    public class UpdateDraftRequest
    {
        public int DraftId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
