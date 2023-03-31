using Microsoft.EntityFrameworkCore;
using ApiGateway.Accounts.Entities;
using ApiGateway.Accounts.Database;
using ApiGateway.EmailConfirmation.Entities;
using ApiGateway.EmailConfirmation.Database;
using ApiGateway.Communities.Entities;
using ApiGateway.Communities.Database;
using ApiGateway.FileUpload.Entities;
using ApiGateway.FileUpload.Database;

namespace ApiGateway.Database
{
    public class AppDbContext : DbContext 
    {
        public DbSet<User> Users { get; set; }
        public DbSet<EmailConfirmationCode> EmailConfirmationCodes { get; set; }
        public DbSet<Community> Communities { get; set; }
        public DbSet<FileDetails> FileDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder opt)
        {
            opt.UseNpgsql("Server=localhost; User Id=postgres; Password=ashkanroot; port=5432; Database=questify");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserEntityConfig());
            modelBuilder.ApplyConfiguration(new EmailConfirmationCodeConfig());
            modelBuilder.ApplyConfiguration(new CommunityEntityConfig());
            modelBuilder.ApplyConfiguration(new FileDetailsDbConfig());
        }
    }
}
