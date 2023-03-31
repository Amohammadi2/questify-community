namespace ApiGateway.FileUpload.Exceptions
{
	[Serializable]
	public class FileTooLargeException : Exception
	{
		public FileTooLargeException() { }
		public FileTooLargeException(string message) : base(message) { }
		public FileTooLargeException(string message, Exception inner) : base(message, inner) { }
		protected FileTooLargeException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
