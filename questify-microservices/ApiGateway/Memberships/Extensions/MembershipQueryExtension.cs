using ApiGateway.Memberships.Entities;
using ApiGateway.Utils;
using Microsoft.EntityFrameworkCore;

namespace ApiGateway.Memberships.Extensions
{
    public static class MembershipQueryExtension
    {
        public static IQueryable<CommunityMembership> WhereMembership(this IQueryable<CommunityMembership> memberships, int memberId, int communityId)
        {
            return memberships.Where(m => m.MemberId == memberId && m.CommunityId == communityId);
        }

        /// <exception cref="RecordNotFoundException" />
        public static async Task<CommunityMembership> FirstOrThrowAsync(this IQueryable<CommunityMembership> memberships)
        {
            try
            {
                return await memberships.FirstAsync();
            }
            catch(InvalidOperationException e)
            {
                throw RecordNotFoundException.MembershipNotFound();
            }
        }
    }
}
