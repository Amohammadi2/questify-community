namespace ApiGateway.Memberships.Dtos
{
    public class AssignAdminRequest
    {
        public int MemberId { get; set; }
        public int CommunityId { get; set; }
        public bool Admin { get; set; }
    }
}
