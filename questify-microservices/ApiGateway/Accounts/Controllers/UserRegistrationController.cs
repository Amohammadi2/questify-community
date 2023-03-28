using ApiGateway.Accounts.Dtos;
using ApiGateway.Accounts.Presentations;
using ApiGateway.Accounts.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ApiGateway.Accounts.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class UserRegistrationController : ControllerBase
    {

        private UserRegisterer _registerer { get; set; }

        public UserRegistrationController(UserRegisterer registerer)
        {
            _registerer = registerer;
        }

        [Route("RegisterAccount")]
        [HttpPost]
        public ActionResult<UserPresentation> RegisterAccount([FromBody] AccountRegistrationRequest registrationRequest)
        {
            var result = _registerer.RegisterUser(registrationRequest);
            if (result.IsError)
            {
                return BadRequest(result.Errors);
            }
            var user = result.Payload;
            return Ok(new UserPresentation(user));
        }
    }
}
