using ApiGateway.Accounts.Entities;

namespace ApiGateway.Accounts.Presentations
{
    public class UserPresentation
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }

        public UserPresentation(User user)
        {
            Username = user.Username;
            Email = user.Email;
            IsAdmin = user.isAdmin;
            Id = user.Id;
        }
    }
}
