using System.ComponentModel.DataAnnotations;

namespace ApiGateway.Communities.Dtos
{
    public class UpdateCommunityInfoRequest
    {
        [Required]
        public int CommunityId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
