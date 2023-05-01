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
    [Authorize]
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
        [HttpPatch]
        public async Task<ActionResult> UploadProfileImg([FromForm] UpdateCommunityProfileImgRequest req)
        {
            try
            {
                await _communityService.UpdateCommunityProfileImage(req);
            }
            catch(ServiceException e)
            {
                return BadRequest(e.ToApiError());
            }
            return Ok(new ApiOk());
        }

        [Route("UpdateInfo")]
        [HttpPatch]
        public async Task<ActionResult> UpdateInfo([FromBody] UpdateCommunityInfoRequest request)
        {
            await _communityService.UpdateCommunityInfo(request);
            return Ok(new ApiOk());
        }

        [Route("DeleteCommunity")]
        [HttpDelete]
        public async Task<ActionResult> DeleteCommunity([FromBody] DeleteCommunityRequest request)
        {
            try
            {
                await _communityService.DeleteCommunity(request.CommunityId);
                return Ok(new ApiOk());
            }
            catch(RecordNotFoundException e)
            {
                return BadRequest(e.ToApiError());
            }
        }
    }
}
