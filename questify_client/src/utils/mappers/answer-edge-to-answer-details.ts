import { AnswerType, AnswerTypeEdge, GetQuestionDetailsQuery, ProfileType, UserType } from "@/gen/gql/graphql";

interface HasUserProfileImg extends Pick<UserType, 'username' | 'id'> {
  profile: Pick<ProfileType, 'profileImg'>
}

export interface AnswerDetails extends Pick<AnswerType, 'htmlContent' | 'id' | 'created' | 'accepted'> {
  author: HasUserProfileImg
}

export function answerEdgeToAnswerDetailsArray(data: GetQuestionDetailsQuery) : AnswerDetails[] {
  return data.question?.answers?.edges.map(answerEdge => {
    return {
      accepted: answerEdge?.node?.accepted || false,
      created: new Date(answerEdge?.node?.created),
      htmlContent: answerEdge?.node?.htmlContent || '',
      id: answerEdge?.node?.id || '-1',
      author: {
        id: answerEdge?.node?.author?.id || '-1',
        username: answerEdge?.node?.author?.username || '',
        profile: {
          profileImg: answerEdge?.node?.author?.profile?.profileImg
        }
      }
    }
  }) || []
}