import { $answersApi, $questionsApi } from "@/apis"
import { client } from "@/apollo/client"
import RichTextEditor, { ContentAggregate } from "@/components/RichTextEditor"
import { AnswerWrite } from "@/gen"
import { graphql } from "@/gen/gql"
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
    client.cache.updateQuery({
      query: graphql(`
        query AddAnswerToQuestion($qid: ID!) {
          question(id: $qid) {
            answers {
              edges {
                node {
                  id
                  htmlContent
                  created
                  updated
                  accepted
                  author {
                    id
                    username
                  }
                }
              }
            }
          }
        }
      `),
      variables: {
        qid: qid || ''
      }
    }, (data) => {
        if (data) {
          const prevAnswers = data.question?.answers?.edges || []
          return {
            question: {
              answers: {
                edges: [{
                  node: {
                    id: `${res.id}`,
                    htmlContent: res.htmlContent,
                    created: new Date().toLocaleDateString('fa-IR'),
                    updated: new Date().toLocaleDateString('fa-IR'),
                    accepted: false,
                    author: {
                      username: userProfile?.username || '',
                      id: '' // Todo: make the api return the id
                    }
                  }
                }, ...prevAnswers]
              }
            }
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