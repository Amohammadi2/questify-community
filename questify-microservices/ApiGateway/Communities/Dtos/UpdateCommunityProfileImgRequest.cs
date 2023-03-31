using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Communities.Dtos
{
    public class UpdateCommunityProfileImgRequest
    {
        public IFormFile NewProfileImg { get; set; }
        public int CommunityId { get; set; }
    }
}
