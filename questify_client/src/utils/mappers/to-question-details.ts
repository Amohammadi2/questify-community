import { GetQuestionDetailsQuery, QuestionType, UserType } from "@/gen/gql/graphql";

export interface QuestionDetails extends Pick<QuestionType, 'id' | 'title' | 'htmlContent'> {
  created: Date
  author: Pick<UserType, 'username' | 'id'>
}

export function toQuestionDetails(data: GetQuestionDetailsQuery): QuestionDetails {
  return {
    created: new Date(data.question?.created),
    htmlContent: data.question?.htmlContent || '',
    title: data.question?.title || '',
    id: data.question?.id || '-1',
    author: {
      username: data.question?.author?.username || '',
      id: data.question?.author?.id || '-1'
    }
  }
}