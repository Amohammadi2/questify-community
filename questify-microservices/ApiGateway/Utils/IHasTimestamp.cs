namespace ApiGateway.Utils
{
    public interface IHasTimestamp
    {
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
    }
}
