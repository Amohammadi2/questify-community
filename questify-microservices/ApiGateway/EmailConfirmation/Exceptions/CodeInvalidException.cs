namespace ApiGateway.EmailConfirmation.Exceptions
{
	[Serializable]
	public class CodeInvalidException : Exception
	{
		public CodeInvalidException() { }
		public CodeInvalidException(string message) : base(message) { }
		public CodeInvalidException(string message, Exception inner) : base(message, inner) { }
		protected CodeInvalidException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
