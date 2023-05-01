using ApiGateway.Communities.Dtos;
using ApiGateway.Communities.Entities;
using ApiGateway.Communities.Validators;
using ApiGateway.Database;
using ApiGateway.FileUpload.Services;
using ApiGateway.Utils;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

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
            var fileDetails = await _imgUploader.UploadFile(request.NewProfileImg, "community-profile-imgs");
            var community = _dbContext.Communities.Where(c => c.Id == request.CommunityId).First();
            community.ProfileImgLink = fileDetails.fileUrl;
            _dbContext.Communities.Update(community);
            await _dbContext.SaveChangesAsync();
            await _dbContext.Entry(community).ReloadAsync();
            return community;
        }

        public async Task UpdateCommunityInfo(UpdateCommunityInfoRequest request)
        {
            var community = await _dbContext.Communities
                .Where(c => c.Id == request.CommunityId)
                .FirstAsync();
            community.Name = request.Name;
            community.Description = request.Description;
            _dbContext.Communities.Update(community);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteCommunity(int id)
        {
            try
            {
                var community = await _dbContext.Communities.Where(c => c.Id == id).FirstAsync();
                _dbContext.Communities.Remove(community);
                await _dbContext.SaveChangesAsync();
            }
            catch(InvalidOperationException)
            {
                throw new RecordNotFoundException($"No community with id of {id} was found");
            }
        }
    }
}
