using ApiGateway.Auth.Services;
using ApiGateway.Memberships.Dtos;
using ApiGateway.Memberships.Services;
using ApiGateway.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.CommunityMemberships.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipController : ControllerBase
    {

        private MembershipService _membershipService { get; set; }

        public MembershipController(MembershipService membershipService)
        {
            _membershipService = membershipService;
        }

        [Route("JoinCommunity")]
        [HttpPost]
        public async Task<ActionResult> JoinCommunity([FromBody] JoinCommunityRequest request)
        {
            var userId = new IdentityResolver().ResolveUserId(HttpContext);
            await _membershipService.Join(userId, request);
            return Ok(new ApiOk());
        }

        [Route("LeaveCommunity")]
        [HttpDelete]
        public async Task<ActionResult> LeaveCommunity([FromBody] LeaveCommunityRequest request)
        {
            var userId = new IdentityResolver().ResolveUserId(HttpContext);
            await _membershipService.Leave(userId, request);
            return Ok(new ApiOk());
        }

        [Route("UpgradeToAdmin")]
        [HttpPatch]
        public async Task<ActionResult> UpgradeToAdmin([FromBody] AssignAdminRequest request)
        {
            var userId = new IdentityResolver().ResolveUserId(HttpContext);
            try
            {
                await _membershipService.AssignAdmin(userId, request);
            }
            catch(RecordNotFoundException e)
            {
                return BadRequest(e.ToApiError());
            }
            return Ok(new ApiOk());
        }

        [Route("KickMember")]
        [HttpDelete]
        public async Task<ActionResult> KickMember([FromBody] KickMemberRequest request)
        {
            var userId = new IdentityResolver().ResolveUserId(HttpContext);
            try
            {
                await _membershipService.Kick(userId, request);
            }
            catch(RecordNotFoundException e)
            {
                return BadRequest(e.ToApiError());
            }
            return Ok(new ApiOk());
        }
    }
}
