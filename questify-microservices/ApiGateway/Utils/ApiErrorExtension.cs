namespace ApiGateway.Utils
{
    public static class ApiErrorExtension
    {
        public static ApiError ToApiError(this ServiceException serviceException)
        {
            return new ApiError(serviceException.GetErrorCode(),serviceException.Message);
        }
    }
}
