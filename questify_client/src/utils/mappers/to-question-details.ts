import { GetQuestionDetailsQuery, ProfileType, QuestionType, UserType } from "@/gen/gql/graphql";

interface HasUserProfileImg extends Pick<UserType, 'username' | 'id'> {
  profile: Pick<ProfileType, 'profileImg'>
}

export interface QuestionDetails extends Pick<QuestionType, 'id' | 'title' | 'htmlContent'> {
  created: Date
  author: HasUserProfileImg
}

export function toQuestionDetails(data: GetQuestionDetailsQuery): QuestionDetails {
  return {
    created: new Date(data.question?.created),
    htmlContent: data.question?.htmlContent || '',
    title: data.question?.title || '',
    id: data.question?.id || '-1',
    author: {
      username: data.question?.author?.username || '',
      id: data.question?.author?.id || '-1',
      profile: {
        profileImg: data.question?.author?.profile?.profileImg
      }
    }
  }
}