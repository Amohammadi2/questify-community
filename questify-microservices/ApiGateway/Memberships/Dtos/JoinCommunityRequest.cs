using System.ComponentModel.DataAnnotations;

namespace ApiGateway.Memberships.Dtos
{
    public class JoinCommunityRequest
    {
        [Required]
        public int CommunityId { get; set; }

        // send only if you want to join a private community
        public string? InvitationCode { get; set; }
    }
}
