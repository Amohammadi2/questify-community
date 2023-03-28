using ApiGateway.Accounts.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ApiGateway.Accounts.Database
{
    public class UserEntityConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasIndex(u => u.Username).IsUnique();
            builder.HasIndex(u => u.Email).IsUnique();
            builder.Property(u => u.Username).IsRequired();
        }
    }
}
