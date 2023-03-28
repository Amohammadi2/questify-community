using ApiGateway.Accounts.Entities;

namespace ApiGateway.Communities.Entities
{
    public class Community
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? ProfileImgLink { get; set; }
        public bool IsPrivate { get; set; }
        public int OwnerId { get; set; }
        public User Owner { get; set; }
    }
}
