using ApiGateway.Accounts.Entities;
using ApiGateway.Questions.Entities;

namespace ApiGateway.Questions.Dtos
{
    public class CreateDraftRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DraftType DraftType { get; set; }
    }
}
