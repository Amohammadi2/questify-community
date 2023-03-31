using ApiGateway.Auth.Services;
using ApiGateway.Communities.Dtos;
using ApiGateway.Communities.Services;
using ApiGateway.Utils;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Communities.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class CommunityController : ControllerBase
    {

        private CommunityService _communityService { get; set; }

        public CommunityController(CommunityService communityService)
        {
            _communityService = communityService;
        }

        [Route("CreateCommunity")]
        [HttpPost]
        public ActionResult CreateCommunity([FromBody] CreateCommunityRequest request)
        {
            var userId = new IdentityResolver().ResolveUserId(HttpContext);
            try
            {
                var community = _communityService.CreateCommunity(userId, request);
                return Ok(new ApiEntity { Id = community.Id });
            }
            catch(ValidationException e)
            {
                return BadRequest(e.Errors);
            }
        }

        [Route("UploadProfileImg")]
        [HttpPost]
        public async Task<ActionResult> UploadProfileImg([FromForm] UpdateCommunityProfileImgRequest req)
        {
            await _communityService.UpdateCommunityProfileImage(req);
            return Ok(new ApiOk());
        }
    }
}
