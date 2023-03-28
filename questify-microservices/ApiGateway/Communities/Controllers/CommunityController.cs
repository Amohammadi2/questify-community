﻿using ApiGateway.Communities.Dtos;
using ApiGateway.Communities.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

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
            return Ok(new { Username = HttpContext.User.Claims.First(c=>c.Type==JwtRegisteredClaimNames.Sub).Value });
        }
    }
}
