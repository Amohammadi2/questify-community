using ApiGateway.Auth.Services;
using ApiGateway.FileUpload.Services;
using ApiGateway.Questions.Dtos;
using ApiGateway.Questions.Services;
using ApiGateway.Utils;
using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Questions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DraftsController : ControllerBase
    {

        private ImageUploader _ImageUploader { get; set; }
        private DraftingService _DraftingService { get; set; }

        public DraftsController(DraftingService draftingService, ImageUploader imageUploader)
        {
            _DraftingService = draftingService;
            _ImageUploader = imageUploader;
        }

        [Route("CreateDraft")]
        [HttpPost]
        public async Task<ActionResult<ApiEntity>> CreateDraft([FromBody] CreateDraftRequest request)
        {
            var userId = new IdentityResolver().ResolveUserIdOrThrow(HttpContext);
            var draft = await _DraftingService.CreateDraft(userId, request);
            return Ok(new ApiEntity { Id = draft.Id });
        }

        [Route("AssociateFile")]
        [HttpPost]
        public async Task<ActionResult<ApiOk>> AssociateFile([FromForm] AssociateFileRequest request)
        {
            var userId = new IdentityResolver().ResolveUserIdOrThrow(HttpContext);
            return Ok();
        }
    }
}
