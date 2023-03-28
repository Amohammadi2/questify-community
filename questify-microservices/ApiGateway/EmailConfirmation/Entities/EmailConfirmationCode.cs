namespace ApiGateway.EmailConfirmation.Entities
{
    public class EmailConfirmationCode
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Email { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
