using ApiGateway.Communities.Entities;

namespace ApiGateway.Memberships.Entities
{
    public class Invitation
    {
        public int Id { get; set; }
        public int CommunityId { get; set; }
        public Community Community { get; set; }
        public string Code { get; set; }
        public DateTime Expiration { get; set; }
    }
}
