using ApiGateway.Communities.Dtos;
using ApiGateway.Communities.Entities;
using ApiGateway.Communities.Validators;
using ApiGateway.Database;
using FluentValidation;


namespace ApiGateway.Communities.Services
{
    public class CommunityService
    {
        private AppDbContext _dbContext { get; set; }
        private CommunityValidator _communityValidator { get; set; }

        public CommunityService(AppDbContext dbContext, CommunityValidator communityValidator)
        {
            _dbContext = dbContext;
            _communityValidator = communityValidator;
        }

        public Community CreateCommunity(int userId, CreateCommunityRequest request)
        {
            var community = new Community
            {
                Name = request.Name,
                Description = request.Description,
                IsPrivate = request.IsPrivate,
                OwnerId = userId
            };
            _communityValidator.ValidateAndThrow(community);
            _dbContext.Communities.Add(community);
            _dbContext.SaveChanges();
            _dbContext.Entry(community).Reload();
            return community;
        }
    }
}
