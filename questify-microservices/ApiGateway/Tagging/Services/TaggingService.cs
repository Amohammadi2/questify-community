namespace ApiGateway.Tagging.Services
{
    /* Keeps track of all the tags that are entered within the system
     * along with some metadata like the number of posts associated with
     * every tag.
     * Even though the data about tags are duplicated across `Questions` and
     * `Tagging` modules but it's worth the trade off because it makes data
     * access easier and faster for both modules by optimizing the relational
     * model for specific needs of each.
    */
    public class TaggingService
    {
    }
}
