namespace ApiGateway.Utils
{

	[Serializable]
	public class ServiceException : Exception
	{
		public virtual string GetErrorCode()
		{
			return "ServiceError";
		}
		public ServiceException() { }
		public ServiceException(string message) : base(message) { }
		public ServiceException(string message, Exception inner) : base(message, inner) { }
		protected ServiceException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
