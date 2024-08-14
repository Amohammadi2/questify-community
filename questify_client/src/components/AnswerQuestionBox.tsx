import { $answersApi, $questionsApi } from "@/apis"
import { client } from "@/apollo/client"
import RichTextEditor, { ContentAggregate } from "@/components/RichTextEditor"
import { AnswerWrite } from "@/gen"
import { AnswerTypeConnection } from "@/gen/gql/graphql"
import { $userProfile } from "@/store/user-profile.store"
import { gql } from "@apollo/client"
import { useCallback, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"

export default function AnswerQuestionBox() {
  
  const userProfile = useRecoilValue($userProfile)
  const navigate = useNavigate()
  const { qid } = useParams()
  const answersApi = useRecoilValue($answersApi)
  const questionsApi = useRecoilValue($questionsApi)

  const postAnswerCB = useCallback(({ content } : ContentAggregate) => {
    return answersApi.answersCreate({
      answerWriteRequest: {
        htmlContent: content,
        question: Number.parseInt(qid || '0')
      }
    })
  }, [answersApi, qid])


  useEffect(() => {
    questionsApi
      .questionsRetrieve({ id: Number.parseInt(qid || '-1') })
      .catch(() => navigate('/questions')) // the only error that can happen is 404
  }, [qid])

  const afterPublish = (res: AnswerWrite): void => {
    const authorRef = client.cache.writeFragment({
      id: `UserType:${userProfile?.id}`,
      fragment: gql`
        fragment CreateAuthor on UserType {
          id
          __typename
          username
        }
      `,
      data: {
        id: `${userProfile?.id}`,
        __typename: "UserType",
        username: userProfile?.username
      }
    })
    const newAnswerRef = client.cache.writeFragment({
      fragment: gql`
        fragment NewAnswer on AnswerType {
          __typename
          id
          htmlContent
          created
          updated
          accepted
          author {
            __typename
            id
            username
          }
        }
      `,
      data: {
        __typename: 'AnswerType',
        id: `${res.id}`,
        htmlContent: res.htmlContent,
        created: new Date().toLocaleDateString('fa-IR'),
        updated: new Date().toLocaleDateString('fa-IR'),
        accepted: false,
        author: authorRef
      }
    },)
    client.cache.modify({
      id: client.cache.identify({__typename: 'QuestionType', id: qid }),
      fields: {
        numAnswers(n) { return n+1 },
        answers(answersConnection: AnswerTypeConnection) {
          return {
            ...answersConnection,
            edges: [{
              node: newAnswerRef
            }, ...answersConnection.edges]
          } as AnswerTypeConnection
        }
      }
    })
    return navigate('/question-details/' + qid, { replace: true })
  }
  return (
    <RichTextEditor
      onPublish={postAnswerCB}
      afterPublish={afterPublish}
      submitButtonText="انتشار پاسخ"
      contentPlaceholder="پاسخ خود را وارد کنید..."
    />
  )
}