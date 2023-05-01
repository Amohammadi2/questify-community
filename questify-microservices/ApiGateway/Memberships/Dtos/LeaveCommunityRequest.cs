using System.ComponentModel.DataAnnotations;

namespace ApiGateway.Memberships.Dtos
{
    public class LeaveCommunityRequest
    {
        [Required]
        public int CommunityId { get; set; }
    }
}
