using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace ApiGateway.Accounts.Entities
{
    public class User
    {
        public int Id { get; set; }
        // Login credentials
        public string Username { get; set; }

        private string _passwordHash { get; set; }
        public string PasswordHash
        {
            get { return _passwordHash; }
            set
            {
                var hasher = new PasswordHasher<User>();
                _passwordHash = hasher.HashPassword(this, value);
            }
        }

        public string Email { get; set; } 
        
        // User account states
        public bool isAdmin { get; set; }
        public bool isVerified { get; set; }
        public bool isBanned { get; set; }

        // Metadata
        public bool createdAt { get; set; }
    }
}
