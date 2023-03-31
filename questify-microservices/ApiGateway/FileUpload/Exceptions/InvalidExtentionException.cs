namespace ApiGateway.FileUpload.Exceptions
{
	[Serializable]
	public class InvalidExtentionException : Exception
	{
		public InvalidExtentionException() { }
		public InvalidExtentionException(string message) : base(message) { }
		public InvalidExtentionException(string message, Exception inner) : base(message, inner) { }
		protected InvalidExtentionException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
