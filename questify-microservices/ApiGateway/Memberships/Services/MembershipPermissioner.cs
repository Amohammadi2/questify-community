using ApiGateway.Communities.Services;
using ApiGateway.Database;
using ApiGateway.Memberships.Entities;
using Microsoft.EntityFrameworkCore;

namespace ApiGateway.Memberships.Services
{
    public class MembershipPermissioner
    {
        private AppDbContext _dbContext { get; set; }
        private CommunityPermissioner _communityPermissioner { get; set; }

        public MembershipPermissioner(AppDbContext dbContext, CommunityPermissioner communityPermissioner)
        {
            _dbContext = dbContext;
            _communityPermissioner = communityPermissioner;
        }

        private IQueryable<CommunityMembership> GetMembership(int userId, int communityId)
        {
            return _dbContext.CommunityMemberships
                .Where(m => m.CommunityId == communityId && m.MemberId == userId);
        }

        public async Task<bool> IsMemberOf(int userId, int communityId)
        {
            return await GetMembership(userId, communityId).AnyAsync();
        }

        public async Task<bool> IsAdminOf(int userId, int communityId)
        {
            return await GetMembership(userId, communityId).AnyAsync(m => m.Role == MemberRole.Admin);
        }

        public async Task<bool> IsHighOrder(int userId, int communityId, bool ownerOnly=false)
        {
            if (ownerOnly)
                return await _communityPermissioner.IsOwnerOf(userId, communityId);
            return (
                await IsAdminOf(userId, communityId) ||
                await _communityPermissioner.IsOwnerOf(userId, communityId)
            );
        }
    }
}
