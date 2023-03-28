using Microsoft.IdentityModel.JsonWebTokens;

namespace ApiGateway.Auth.Services
{
    public class IdentityResolver
    {
        public string ResolveUser(HttpContext httpContext)
        {
            return httpContext.User.Claims
                .First(c => c.Type == JwtRegisteredClaimNames.Sub).Value;
        }

        public int ResolveUserId(HttpContext httpContext)
        {
            return int.Parse(httpContext.User.Claims
                .First(c => c.Type == "Id").Value);
        }
    }
}
