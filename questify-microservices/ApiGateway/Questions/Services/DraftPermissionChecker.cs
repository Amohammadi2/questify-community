using ApiGateway.Database;
using ApiGateway.Utils;
using Microsoft.EntityFrameworkCore;

namespace ApiGateway.Questions.Services
{
    public class DraftPermissionChecker
    {
        private AppDbContext _DbContext { get; set; }

        public DraftPermissionChecker(AppDbContext dbContext)
        {
            _DbContext = dbContext;
        }

        public async Task IsAuthorOfOrThrow(int userId, int draftId)
        {
            if(!await _DbContext.Drafts.Where(d => d.AuthorId == userId && d.Id == draftId).AnyAsync())
                throw new ServiceException("You are not author of this draft or it does not exist");
        }
    }
}
