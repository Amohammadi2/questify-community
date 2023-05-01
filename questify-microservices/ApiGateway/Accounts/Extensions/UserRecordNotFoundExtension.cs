namespace ApiGateway.Utils
{
    public partial class RecordNotFoundException
    {
        public static RecordNotFoundException UserNotFoundById(int id)
        {
            return new RecordNotFoundException($"No user with the id of {id} was found");
        }
    }
}