using ApiGateway.Database;
using Microsoft.EntityFrameworkCore;

namespace ApiGateway.Communities.Services
{
    public class CommunityPermissioner
    {

        private AppDbContext _dbContext { get; set;  }
        
        public CommunityPermissioner(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> IsOwnerOf(int userId, int communityId)
        {
            // Todo: cache result 
            return await _dbContext.Communities.AnyAsync(c => c.OwnerId == userId && c.Id == communityId);
        }

    }
}
