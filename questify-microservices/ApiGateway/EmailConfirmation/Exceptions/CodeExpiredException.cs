namespace ApiGateway.EmailConfirmation.Exceptions
{

	[Serializable]
	public class CodeExpiredException : Exception
	{
		public CodeExpiredException() { }
		public CodeExpiredException(string message) : base(message) { }
		public CodeExpiredException(string message, Exception inner) : base(message, inner) { }
		protected CodeExpiredException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
