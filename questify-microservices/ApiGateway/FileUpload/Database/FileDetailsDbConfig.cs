using ApiGateway.FileUpload.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ApiGateway.FileUpload.Database
{
    public class FileDetailsDbConfig : IEntityTypeConfiguration<FileDetails>
    {
        public void Configure(EntityTypeBuilder<FileDetails> builder)
        {
            builder.Property(f => f.CreatedAt)
                .HasDefaultValueSql("NOW()");
        }
    }
}
