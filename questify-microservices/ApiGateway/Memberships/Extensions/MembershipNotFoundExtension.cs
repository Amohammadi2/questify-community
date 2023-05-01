namespace ApiGateway.Utils
{
    public partial class RecordNotFoundException
    {
        public static RecordNotFoundException MembershipPairNotFound(int communityId, int memberId)
        {
            return new RecordNotFoundException(
                $"No such membership with community id of {communityId} and member id of {memberId} exists");
        }

        /// <summary>
        /// Parameterless version of this: <seealso cref="MembershipPairNotFound(int, int)"/>
        /// </summary>
        /// <returns></returns>
        public static RecordNotFoundException MembershipNotFound()
        {
            return new RecordNotFoundException(
                $"No such membership was found, please enter correct parameters for community and member id");
        }
    }
}
