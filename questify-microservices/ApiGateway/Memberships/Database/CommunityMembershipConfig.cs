using ApiGateway.Memberships.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ApiGateway.Memberships.Database
{
    public class CommunityMembershipConfig : IEntityTypeConfiguration<CommunityMembership>
    {
        public void Configure(EntityTypeBuilder<CommunityMembership> builder)
        {
            builder.HasIndex(m => new { m.CommunityId, m.MemberId })
                .IsUnique();
            builder.HasOne(m => m.Member)
                .WithMany()
                .HasForeignKey(m => m.MemberId);
            builder.HasOne(m => m.Community)
                .WithMany()
                .HasForeignKey(m => m.CommunityId);
            builder.Property(m => m.JoinedAt)
                .HasDefaultValueSql("NOW()");
            builder.Property(m => m.Role)
                .HasDefaultValue(MemberRole.Normal);
        }
    }
}
