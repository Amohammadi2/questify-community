using ApiGateway.Utils;

namespace ApiGateway.FileUpload.Exceptions
{
	[Serializable]
	public class InvalidExtentionException : ServiceException
	{
        public override string GetErrorCode()
        {
            return "InvalidExtension";
        }

        public InvalidExtentionException() { }
		public InvalidExtentionException(string message) : base(message) { }
		public InvalidExtentionException(string message, Exception inner) : base(message, inner) { }
		protected InvalidExtentionException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
