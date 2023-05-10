using ApiGateway.Accounts.Entities;
using ApiGateway.Utils;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiGateway.Questions.Entities
{

    public enum DraftType
    {
        Question = 0,
        Answer = 1
    }

    public class Draft : IHasTimestamp
    {
        public int Id { get; set; }
        public string Title { get; set; }
        [NotMapped]
        public string Description { get => Content.Substring(0, Math.Min(Content.Length, 200)); }
        public string Content { get; set; }
        public DraftType DraftType { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public User Author { get; set; }
        public int AuthorId { get; set; }
        public bool Published { get; set; }
    }
}
