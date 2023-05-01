using ApiGateway.Database;
using ApiGateway.Memberships.Dtos;
using ApiGateway.Memberships.Entities;
using ApiGateway.Memberships.Exceptions;
using ApiGateway.Memberships.Extensions;
using ApiGateway.Utils;
using Microsoft.EntityFrameworkCore;

namespace ApiGateway.Memberships.Services
{
    public class MembershipService
    {

        private AppDbContext _dbContext { get; set; }
        private InvitationService _invitationService { get; set; }
        private MembershipAccessor _Accessor { get; set; }


        public MembershipService(
            AppDbContext dbContext,
            InvitationService invitationService,
            MembershipAccessor accessor)
        {
            _dbContext = dbContext;
            _invitationService = invitationService;
            _Accessor = accessor;
        }

        public async Task Join(int userId, JoinCommunityRequest request)
        {
            await AssertUserExists(userId);
            var community = _dbContext.Communities.Where(c => c.Id == request.CommunityId).First();
            if (community.IsPrivate)
            {
                var isVerified = await _invitationService.VerifyCode(request.CommunityId, request.InvitationCode);
                if (!isVerified)
                    throw new InvitationCodeInvalidException("The invitation code is incorrect");
            }
            await CreateMembership(userId, request.CommunityId);
        }


        public async Task Leave(int userId, LeaveCommunityRequest request)
        {

            var membership = await _dbContext.CommunityMemberships
                .Where(m => m.MemberId == userId && m.CommunityId == request.CommunityId)
                .FirstOrThrowAsync();
            _dbContext.CommunityMemberships.Remove(membership);
            await _dbContext.SaveChangesAsync();

        }

        public async Task Kick(int userId, KickMemberRequest request)
        {
            await _Accessor.RequireHighOrder(userId, request.CommunityId);
            await Leave(request.MemberId,
                new LeaveCommunityRequest { CommunityId = request.CommunityId });
        }

        public async Task AssignAdmin(int userId, AssignAdminRequest request)
        {
            await _Accessor.RequireHighOrder(userId, request.CommunityId, ownerOnly: true);

            var membership = await _dbContext.CommunityMemberships
                    .WhereMembership(request.MemberId, request.CommunityId)
                    .FirstOrThrowAsync();

            membership.Role = MemberRole.Admin;
            _dbContext.CommunityMemberships.Update(membership);
            await _dbContext.SaveChangesAsync();

        }

        private async Task CreateMembership(int userId, int communityId)
        {
            var membership = new CommunityMembership
            {
                MemberId = userId,
                CommunityId = communityId
            };
            await _dbContext.CommunityMemberships.AddAsync(membership);
            await _dbContext.SaveChangesAsync();
        }

        private async Task AssertUserExists(int userId)
        {
            if (!await _dbContext.Users.AnyAsync(u => u.Id == userId))
                throw RecordNotFoundException.UserNotFoundById(userId);
        }

    }
}
