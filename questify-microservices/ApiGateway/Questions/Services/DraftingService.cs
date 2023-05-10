using ApiGateway.Database;
using ApiGateway.FileUpload.Services;
using ApiGateway.Questions.Dtos;
using ApiGateway.Questions.Entities;
using ApiGateway.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiGateway.Questions.Services
{
    public class DraftingService
    {

        private AppDbContext _DbContext { get; set; }
        private ImageUploader _ImageUploader { get; set; }
        private DraftPermissionChecker _DraftPermissionChecker { get; set; }

        public DraftingService(AppDbContext DbContext, ImageUploader imageUploader, DraftPermissionChecker draftPermissionChecker)
        {
            _DbContext = DbContext;
            _ImageUploader = imageUploader;
            _DraftPermissionChecker = draftPermissionChecker;
        }

        public async Task<Draft> CreateDraft(int userId, CreateDraftRequest request)
        {
            var draft = new Draft
            {
                Title = request.Title,
                Content = request.Content,
                DraftType = request.DraftType,
            };
            await _DbContext.Drafts.AddAsync(draft);
            await _DbContext.SaveChangesAsync();
            return draft;
        }

        public async Task<DraftFile> AssociateFile(int userId, AssociateFileRequest request)
        {
            await _DraftPermissionChecker.IsAuthorOfOrThrow(userId, request.DraftId);
            try
            {
                var fileDetails = await _ImageUploader.UploadFile(request.File, "different");
                var draftFile = new DraftFile
                {
                    DraftId = request.DraftId,
                    FileUrl = fileDetails.fileUrl
                };
                await _DbContext.DraftFiles.AddAsync(draftFile);
                await _DbContext.SaveChangesAsync();
                return draftFile;
            }
            catch (ServiceException e)
            {
                throw e; // just wanted to show that this part of code might throw
            }
        }

        // updating a draft: title?, content, id -> ok
        public async Task<Draft> UpdateDraft(int userId, UpdateDraftRequest request)
        {
            await _DraftPermissionChecker.IsAuthorOfOrThrow(userId, request.DraftId);
            var draft = await _DbContext.Drafts
                .Where(d => d.AuthorId == userId && d.Id == request.DraftId).FirstAsync();
            
            draft.Title = request.Title;
            draft.Content = request.Content;

            _DbContext.Drafts.Update(draft);
            await _DbContext.SaveChangesAsync();

            return draft;
        }

        public async Task<Draft> LoadDraft(int userId, int draftId)
        {
            return await _DbContext.Drafts
                .Where(d => d.Id == draftId && (d.AuthorId == userId || d.Published))
                .FirstAsync();
        }

        // deleting a draft: id -> ok
        public async Task<bool> DeleteDraft(int userId, int draftId)
        {
            await _DraftPermissionChecker.IsAuthorOfOrThrow(userId, draftId);
            var draft = await _DbContext.Drafts.Where(d => d.Id == draftId).FirstAsync();
            _DbContext.Drafts.Remove(draft);
            await _DbContext.SaveChangesAsync();
            return true;
        }

        // listing drafts: type, author -> list<title>

    }
}
