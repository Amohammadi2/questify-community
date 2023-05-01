namespace ApiGateway.Utils
{

	[Serializable]
	public partial class RecordNotFoundException : ServiceException
	{

        public override string GetErrorCode()
        {
			return "RecordNotFound";
        }

        public RecordNotFoundException() { }
		public RecordNotFoundException(string message) : base(message) { }
		public RecordNotFoundException(string message, Exception inner) : base(message, inner) { }
		protected RecordNotFoundException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
