import { Configuration, TokenApi, QuestionsApi, AnswersApi, UsersApi, FileUploadApi, NotificationsApi, ProfilesApi } from '@/gen'
import { $authToken } from '@/store/auth.store'
import { selector } from 'recoil'

const $apiConfig = selector({
  key: 'api-config',
  get: ({ get }) => {
    const token = get($authToken)
    return new Configuration({
      basePath: 'http://192.168.1.100:8000',
      accessToken: token?.access || undefined
    })
  }
})

export const $tokenApi = selector({
  key: 'token-api',
  get: ({get}) => {
    return new TokenApi(get($apiConfig))
  }
})

export const $questionsApi = selector({
  key: 'questions-api',
  get: ({get}) => {
    return new QuestionsApi(get($apiConfig))
  }
})

export const $answersApi = selector<AnswersApi>({
  key: 'answers-api',
  get: ({get}) => {
    return new AnswersApi(get($apiConfig))
  }
})


export const $usersApi = selector({
  key: 'users-api',
  get: ({get}) => {
    return new UsersApi(get($apiConfig))
  }
})

export const $fileUploadApi = selector({
  key: 'file-upload-api',
  get: ({get}) => {
    return new FileUploadApi(get($apiConfig))
  }
})

export const $notificationsApi = selector({
  key: 'notifications-api',
  get: ({get}) => {
    return new NotificationsApi(get($apiConfig))
  }
})

export const $profilesApi = selector({
  key: 'profiles-api',
  get: ({get}) => {
    return new ProfilesApi(get($apiConfig))
  }
})