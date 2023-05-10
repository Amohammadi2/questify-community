namespace ApiGateway.Questions.Entities
{
    public class DraftFile
    {
        public int Id { get; set; }
        public string FileUrl { get; set; }
        public int DraftId { get; set; }
        public Draft Draft { get; set; }
    }
}
