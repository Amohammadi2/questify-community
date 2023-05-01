namespace ApiGateway.Utils
{
	[Serializable]
	public class AccessDeniedException : ServiceException
	{

        public override string GetErrorCode()
        {
			return "AccessDenied";
        }

        public AccessDeniedException() { }
		public AccessDeniedException(string message) : base(message) { }
		public AccessDeniedException(string message, Exception inner) : base(message, inner) { }
		protected AccessDeniedException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
