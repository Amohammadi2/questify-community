using ApiGateway.EmailConfirmation.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ApiGateway.EmailConfirmation.Database
{
    public class EmailConfirmationCodeConfig : IEntityTypeConfiguration<EmailConfirmationCode>
    {
        public void Configure(EntityTypeBuilder<EmailConfirmationCode> builder)
        {
            builder.Property(e => e.ExpirationDate)
                .ValueGeneratedOnAdd();
            builder.Property(e => e.Code)
                .IsRequired();
            builder.Property(e => e.Email)
                .IsRequired();
        }
    }
}
