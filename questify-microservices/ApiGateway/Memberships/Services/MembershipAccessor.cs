using ApiGateway.Utils;

namespace ApiGateway.Memberships.Services
{
    public class MembershipAccessor
    {
        private MembershipPermissioner _Permissioner { get; set; }
        
        public MembershipAccessor(MembershipPermissioner permissioner)
        {
            _Permissioner = permissioner;
        }

        public async Task RequireHighOrder(int userId, int communityId, bool ownerOnly=false)
        {
            if (!await _Permissioner.IsHighOrder(userId, communityId, ownerOnly))
            {
                throw new AccessDeniedException("You are not a high order member of this community");
            }
        }

        public async Task RequireMember(int userId, int communityId)
        {
            if (!await _Permissioner.IsMemberOf(userId, communityId))
            {
                throw new AccessDeniedException("You are not a member of this community");
            }
        }

        public async Task RequireAdmin(int userId, int communityId)
        {
            if (!await _Permissioner.IsAdminOf(userId, communityId))
            {
                throw new AccessDeniedException("You are not an admin of this community");
            }
        }
    }
}
