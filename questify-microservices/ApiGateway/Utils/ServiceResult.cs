namespace ApiGateway.Utils
{
    public class ServiceResult<T>
    {
        public bool IsError { get { return Errors.Count != 0; } }
        public List<ServiceError> Errors { get; set; } = new();
        public T Payload { get; set; }
    }
}
