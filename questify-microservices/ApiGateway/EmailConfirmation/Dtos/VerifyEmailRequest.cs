namespace ApiGateway.EmailConfirmation.Dtos
{
    public class VerifyEmailRequest
    {
        public string Email { get; set; }
        public string Code { get; set; }
    }
}
