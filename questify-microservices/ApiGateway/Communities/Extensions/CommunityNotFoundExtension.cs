namespace ApiGateway.Utils
{
    public partial class RecordNotFoundException
    {
        public static RecordNotFoundException CommunityNotFoundById(int id)
        {
            return new RecordNotFoundException($"No community with the id of {id} was found");
        }
    }
}
