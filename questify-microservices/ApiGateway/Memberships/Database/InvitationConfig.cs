using ApiGateway.Memberships.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ApiGateway.Memberships.Database
{
    public class InvitationConfig : IEntityTypeConfiguration<Invitation>
    {
        public void Configure(EntityTypeBuilder<Invitation> builder)
        {
            builder.Property(i => i.Expiration).HasDefaultValueSql("NOW()");
            builder.HasOne(i => i.Community).WithMany().HasForeignKey(i => i.CommunityId);
            builder.Property(i => i.Code).IsRequired();
        }
    }
}
