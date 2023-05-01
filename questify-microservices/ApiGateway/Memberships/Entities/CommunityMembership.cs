using ApiGateway.Accounts.Entities;
using ApiGateway.Communities.Entities;

namespace ApiGateway.Memberships.Entities
{

    public enum MemberRole
    {
        Normal = 0,
        Admin = 1
    }

    public class CommunityMembership
    {
        public int Id { get; set; }
        public int CommunityId { get; set; }
        public Community Community { get; set; }
        public int MemberId { get; set; }
        public User Member { get; set; }
        public DateTime JoinedAt { get; set; }
        public MemberRole Role { get; set; }
    }
}
