using ApiGateway.Communities.Dtos;
using ApiGateway.Communities.Entities;
using ApiGateway.Communities.Validators;
using ApiGateway.Database;
using ApiGateway.FileUpload.Services;
using FluentValidation;


namespace ApiGateway.Communities.Services
{
    public class CommunityService
    {
        private AppDbContext _dbContext { get; set; }
        private CommunityValidator _communityValidator { get; set; }
        private ImageUploader _imgUploader { get; set; }

        public CommunityService
        (
            AppDbContext dbContext,
            CommunityValidator communityValidator,
            ImageUploader imageUploader
        )
        {
            _dbContext = dbContext;
            _communityValidator = communityValidator;
            _imgUploader = imageUploader;
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

        public async Task<Community> UpdateCommunityProfileImage(UpdateCommunityProfileImgRequest request)
        {
            var community = _dbContext.Communities.Where(c => c.Id == request.CommunityId).First();
            var fileDetails = await _imgUploader.UploadFile(request.NewProfileImg, "community-profile-imgs");
            community.ProfileImgLink = fileDetails.fileUrl;
            _dbContext.Communities.Update(community);
            await _dbContext.SaveChangesAsync();
            await _dbContext.Entry(community).ReloadAsync();
            return community;
        }
    }
}
