using ApiGateway.Utils;

namespace ApiGateway.FileUpload.Exceptions
{
	[Serializable]
	public class SignatureMismatchException : ServiceException
	{

        public override string GetErrorCode()
        {
            return "SignatureMismatch";
        }

        public SignatureMismatchException() { }
		public SignatureMismatchException(string message) : base(message) { }
		public SignatureMismatchException(string message, Exception inner) : base(message, inner) { }
		protected SignatureMismatchException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
