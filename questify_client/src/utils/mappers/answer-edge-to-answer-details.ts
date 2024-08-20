import { AnswerType, AnswerTypeEdge, GetQuestionDetailsQuery, UserType } from "@/gen/gql/graphql";

export interface AnswerDetails extends Pick<AnswerType, 'htmlContent' | 'id' | 'created' | 'accepted'> {
  author: Pick<UserType, 'username' | 'id'>
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
        username: answerEdge?.node?.author?.username || ''
      }
    }
  }) || []
}