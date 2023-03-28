using ApiGateway.Accounts.Exceptions;
using ApiGateway.Accounts.Services;
using ApiGateway.EmailConfirmation.Dtos;
using ApiGateway.EmailConfirmation.Exceptions;
using ApiGateway.EmailConfirmation.Services;
using ApiGateway.Utils;
using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.EmailConfirmation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailConfirmationController : ControllerBase
    {

        private EmailConfirmationService _service { get; set; }
        private AccountManagerService _accountManager { get; set; }

        public EmailConfirmationController(EmailConfirmationService service, AccountManagerService accountManager)
        {
            _service = service;
            _accountManager = accountManager;
        }

        [Route("VerifyEmail")]
        [HttpPost]
        public ActionResult<ApiOk> VerifyEmail([FromBody] VerifyEmailRequest request)
        {
            try
            {
                _service.VerifyCode(request);
                _accountManager.ActivateAccountByEmail(request.Email);
                return Ok(new ApiOk());
            }
            catch(CodeInvalidException e)
            {
                return BadRequest(new ApiError("CodeInvalid", e.Message));
            }
            catch(CodeExpiredException e)
            {
                return BadRequest(new ApiError("CodeExpired", e.Message));
            }
            catch(UserNotFoundException e)
            {
                return BadRequest(new ApiError("UserNotFound", e.Message));
            }
        }

        [Route("SendConfirmationCode")]
        [HttpPost]
        public ActionResult<ConfirmEmailResult> SendConfirmationCode([FromBody] ConfirmEmailRequest request)
        {
            _service.SendConfirmationCode(request.Email);
            return Ok(new ConfirmEmailResult { Sent = true });
        }
    }
}
