using ApiGateway.Database;
using ApiGateway.Memberships.Entities;
using Microsoft.EntityFrameworkCore;

namespace ApiGateway.Memberships.Services
{
    public class InvitationService
    {

        private AppDbContext _dbContext { get; set; }

        public InvitationService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Invitation CreateInvitation(int communityId, int expiresInMins = 15)
        {
            var random = new Random();
            var code = random.Next(100000,999999+1); // +1 is because : [100000, 999999+1) = [100000, 999999] 
            return new Invitation
            {
                Code = code.ToString(),
                CommunityId = communityId,
                Expiration = DateTime.UtcNow.AddMinutes(expiresInMins)
            };
        }

        public async Task<bool> VerifyCode(int communityId, string? code)
        {
            if (code == null)
                return false;
            var currentTime = DateTime.UtcNow;
            return await _dbContext.Invitations
                .AnyAsync(
                    i => i.CommunityId == communityId &&
                    i.Code == code &&
                    i.Expiration >= currentTime
                );
        }
    }
}
