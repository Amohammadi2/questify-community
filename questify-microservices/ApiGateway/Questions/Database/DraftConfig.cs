using ApiGateway.Questions.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ApiGateway.Questions.Database
{
    public class DraftConfig : IEntityTypeConfiguration<Draft>
    {
        public void Configure(EntityTypeBuilder<Draft> builder)
        {
            builder.HasOne(d => d.Author);
            builder.Property(d => d.Published).HasDefaultValue(false);
        }
    }
}
