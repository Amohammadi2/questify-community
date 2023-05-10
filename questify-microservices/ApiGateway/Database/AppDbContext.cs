using Microsoft.EntityFrameworkCore;
using ApiGateway.Accounts.Entities;
using ApiGateway.Accounts.Database;
using ApiGateway.EmailConfirmation.Entities;
using ApiGateway.EmailConfirmation.Database;
using ApiGateway.Communities.Entities;
using ApiGateway.Communities.Database;
using ApiGateway.FileUpload.Entities;
using ApiGateway.FileUpload.Database;
using ApiGateway.Memberships.Database;
using ApiGateway.Memberships.Entities;
using ApiGateway.Questions.Entities;
using ApiGateway.Questions.Database;
using ApiGateway.Utils;

namespace ApiGateway.Database
{
    public class AppDbContext : DbContext 
    {
        public DbSet<User> Users { get; set; }
        public DbSet<EmailConfirmationCode> EmailConfirmationCodes { get; set; }
        public DbSet<Community> Communities { get; set; }
        public DbSet<FileDetails> FileDetails { get; set; }
        public DbSet<CommunityMembership> CommunityMemberships { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<Draft> Drafts { get; set; }
        public DbSet<DraftFile> DraftFiles { get; set; }

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
            modelBuilder.ApplyConfiguration(new CommunityMembershipConfig());
            modelBuilder.ApplyConfiguration(new InvitationConfig());
            modelBuilder.ApplyConfiguration(new DraftConfig());
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            OnBeforeSaving();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override async Task<int> SaveChangesAsync(
           bool acceptAllChangesOnSuccess,
           CancellationToken cancellationToken = default(CancellationToken)
        )
        {
            OnBeforeSaving();
            return (await base.SaveChangesAsync(acceptAllChangesOnSuccess,
                          cancellationToken));
        }

        private void OnBeforeSaving()
        {
            var entries = ChangeTracker.Entries();
            var utcNow = DateTime.UtcNow;

            foreach (var entry in entries)
            {
                // for entities that inherit from BaseEntity,
                // set UpdatedOn / CreatedOn appropriately
                if (entry.Entity is IHasTimestamp trackable)
                {
                    switch (entry.State)
                    {
                        case EntityState.Modified:
                            // set the updated date to "now"
                            trackable.UpdatedAt = utcNow;

                            // mark property as "don't touch"
                            // we don't want to update on a Modify operation
                            entry.Property("CreatedOn").IsModified = false;
                            break;

                        case EntityState.Added:
                            // set both updated and created date to "now"
                            trackable.CreatedAt = utcNow;
                            trackable.UpdatedAt = utcNow;
                            break;
                    }
                }
            }
        }
    }
}
