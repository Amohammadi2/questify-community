using ApiGateway.Communities.Entities;

namespace ApiGateway.Communities.Extensions
{
    public static class CommunityQueryExtension
    {
        public static IQueryable<Community> Public(this IQueryable<Community> query)
        {
            return query.Where(c => c.IsPrivate == false);
        }

        public static IQueryable<Community> Private(this IQueryable<Community> query)
        {
            return query.Where(c => c.IsPrivate == true);
        }
    }
}
