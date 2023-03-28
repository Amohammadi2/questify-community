using ApiGateway.Database;
using ApiGateway.EmailConfirmation.Dtos;
using ApiGateway.EmailConfirmation.Entities;
using ApiGateway.EmailConfirmation.Exceptions;
using ApiGateway.Utils;
using System.Data.Common;

namespace ApiGateway.EmailConfirmation.Services
{
    public class EmailConfirmationService
    {
        private AppDbContext _dbCtx { get; set; }
        private ILogger _logger { set; get; }

        public EmailConfirmationService(AppDbContext dbContext, ILogger<EmailConfirmationService> logger)
        {
            _dbCtx = dbContext;
            _logger = logger;
        }

        public EmailConfirmationCode SendConfirmationCode(string email)
        {
            Random codeGen = new Random();
            var code = codeGen.Next(100000, 999999).ToString();
            var emailConfirmation = new EmailConfirmationCode { Code = code, Email = email, ExpirationDate = DateTime.Now.AddMinutes(15).ToUniversalTime() };
            _dbCtx.EmailConfirmationCodes.Add(emailConfirmation);
            _dbCtx.SaveChanges();
            // Todo: Send the actual email
            return emailConfirmation;
        }

        public void VerifyCode(VerifyEmailRequest req)
        {
            var confirmation = _dbCtx.EmailConfirmationCodes
                .Where(e => e.Code == req.Code && e.Email == req.Email)
                .OrderByDescending(e => e.ExpirationDate)
                .First();

            if (confirmation == null)
                throw new CodeInvalidException("The code is invalid");

            if ((DateTime.Now.ToUniversalTime() - confirmation.ExpirationDate).TotalMinutes > 15)
                throw new CodeExpiredException("The code has been expired");
        }
    }
}
