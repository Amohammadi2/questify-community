using ApiGateway.Communities.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ApiGateway.Communities.Database
{
    public class CommunityEntityConfig : IEntityTypeConfiguration<Community>
    {
        public void Configure(EntityTypeBuilder<Community> builder)
        {
            builder.HasIndex(c => c.Name).IsUnique();
            builder.HasOne(c => c.Owner)
                .WithMany() // users can have many communities
                .HasForeignKey(c => c.OwnerId);
            builder.Property(c => c.Description)
                .HasMaxLength(512);

        }
    }
}
