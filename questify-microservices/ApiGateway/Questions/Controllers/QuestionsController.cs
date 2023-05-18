using ApiGateway.Auth.Services;
using ApiGateway.Database;
using ApiGateway.Questions.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiGateway.Questions.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly AppDbContext _DbContext;

        public QuestionsController(AppDbContext dbContext)
        {
            _DbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Draft>>> Get(int page = 1, int pageSize = 10)
        {
            var userId = new IdentityResolver().ResolveUserIdOrThrow(HttpContext);
            var query = _DbContext.Drafts.Where(d => d.DraftType == DraftType.Question && (d.Published || d.AuthorId == userId)).OrderByDescending(d => d.CreatedAt);
            var drafts = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return Ok(drafts);
        }

        [HttpPost]
        public async Task<ActionResult<Draft>> Create(CreateQuestionRequest request)
        {
            var userId = new IdentityResolver().ResolveUserIdOrThrow(HttpContext);
            var draft = new Draft
            {
                Title = request.Title,
                Content = request.Content,
                DraftType = DraftType.Question,
                Published = request.Published,
                AuthorId = userId
            };
            await _DbContext.Drafts.AddAsync(draft);
            await _DbContext.SaveChangesAsync();
            return Ok(draft);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Draft>> Update(int id, UpdateQuestionRequest request)
        {
            var userId = new IdentityResolver().ResolveUserIdOrThrow(HttpContext);
            var draft = await _DbContext.Drafts.FindAsync(id);
            if (draft == null)
            {
                return NotFound();
            }
            if (draft.AuthorId != userId)
            {
                return Forbid();
            }
            draft.Title = request.Title ?? draft.Title;
            draft.Content = request.Content ?? draft.Content;
            draft.Published = request.Published ?? draft.Published;
            await _DbContext.SaveChangesAsync();
            return Ok(draft);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var userId = new IdentityResolver().ResolveUserIdOrThrow(HttpContext);
            var draft = await _DbContext.Drafts.FindAsync(id);
            if (draft == null)
            {
                return NotFound();
            }
            if (draft.AuthorId != userId)
            {
                return Forbid();
            }
            _DbContext.Drafts.Remove(draft);
            await _DbContext.SaveChangesAsync();
            return NoContent();
        }
    }

    public class CreateQuestionRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public bool Published { get; set; }
    }

    public class UpdateQuestionRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public bool? Published { get; set; }
    }
}
