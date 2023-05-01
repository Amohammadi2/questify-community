using ApiGateway.Utils;

namespace ApiGateway.Memberships.Exceptions
{

	[Serializable]
	public class InvitationCodeInvalidException : ServiceException
	{

        public override string GetErrorCode()
        {
			return "InvitationCodeInvalid";
        }

        public InvitationCodeInvalidException() { }
		public InvitationCodeInvalidException(string message) : base(message) { }
		public InvitationCodeInvalidException(string message, Exception inner) : base(message, inner) { }
		protected InvitationCodeInvalidException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
