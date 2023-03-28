using ApiGateway.Auth.Dtos;
using ApiGateway.Auth.Services;
using ApiGateway.Dtos;
using ApiGateway.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Auth.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private UserAuthenticator _authenticator { get; set; }
        private TokenGenerator _tokenGenerator { get; set; }

        public TokenController(UserAuthenticator auth, TokenGenerator tokenGenerator)
        {
            _authenticator = auth;
            _tokenGenerator = tokenGenerator;
        }

        [Route("ObtainAuthToken")]
        [HttpPost]
        public ActionResult<TokenContent> ObtainAuthToken([FromBody] UserCredentials credentials)
        {
            var userTask = _authenticator.AuthenticateWithCredentials(credentials);
            userTask.Wait();
            var user = userTask.Result;
            if (user == null)
            {
                return BadRequest();
            }
            var token = _tokenGenerator.CreateTokenForUser(user);
            if (token == null)
                return StatusCode(500, "Couldn't generate the token");
            return Ok(new TokenContent { Token = token });
        }

        [Route("ValidateAuthToken")]
        [HttpPost]
        public ActionResult ValidateAuthToken([FromBody] TokenContent tokenContent)
        {
            return Ok(new { isValid = HttpContext.User.Identity.IsAuthenticated });
        }

    }
}
