import { $answersApi, $questionsApi } from "@/apis"
import { client } from "@/apollo/client"
import RichTextEditor, { ContentAggregate } from "@/components/RichTextEditor"
import { AnswerWrite } from "@/gen"
import { graphql } from "@/gen/gql"
import { AnswerTypeConnection, AnswerTypeEdge } from "@/gen/gql/graphql"
import { $userProfile } from "@/store/user-profile.store"
import { useCallback, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"

export default function AnswerQuestionPage() {
  
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
    client.cache.modify({
      id: client.cache.identify({__typename: 'QuestionType', id: qid }),
      fields: {
        numAnswers(n) { return n+1 },
        answers(answers: AnswerTypeConnection) {
          return {
            ...answers,
            edges: [{
              node: {
                __typename: 'AnswerType',
                created: new Date().toLocaleDateString('fa-IR'),
                updated: new Date().toLocaleDateString('fa-IR'),
                accepted: false,
                htmlContent: res.htmlContent,
                id: res.id,
                author: {
                  username: userProfile?.username,
                  id: '', // Todo: make this work
                }
              }
            }, ...answers.edges] as AnswerTypeEdge[]
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
      onCancel={() => navigate(-1)}
      submitButtonText="انتشار پاسخ"
    />
  )
}