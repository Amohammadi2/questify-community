import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { $questionsApi } from "@/apis"
import RichTextEditor, { ContentAggregate } from "@/components/RichTextEditor"
import { client } from "@/apollo/client"
import { graphql } from "@/gen/gql"
import { $userProfile } from "@/store/user-profile.store"
import { faWindows } from "@fortawesome/free-brands-svg-icons"



export default function AskQuestionPage() {
  
  const userProfile = useRecoilValue($userProfile)
  const navigate = useNavigate()

  const handleCancelation = () => {
    navigate(-1)
  }
  
  const questionsApi = useRecoilValue($questionsApi)

  const publishQuestionCB = useCallback(({ content, tags, title }: ContentAggregate) => {
    const prom = questionsApi.questionsCreate({
      questionWriteRequest: {
        title,
        htmlContent: content,
        tags
      }
    })
    prom.then((res) => {
      const ref = client.writeFragment({
        id: `QuestionType:${res.id}`,
        fragment: graphql(`
          fragment AddQuestion on QuestionType {
            id
            title
            htmlContent
            tags
            created
            updated
            numAnswers
            hasAcceptedAnswer
            author {
              id
              username
            }
          }
        `),
        data: {
          __typename: 'QuestionType',
          htmlContent: content,
          tags: JSON.stringify(tags),
          title,
          id: `${res.id}`,
          created: new Date().toLocaleDateString('fa-IR'),
          updated: new Date().toLocaleDateString('fa-IR'),
          author: {
            username: userProfile?.username || '',
            id: '' // Todo: make this work
          },
          numAnswers: 0,
          hasAcceptedAnswer: false
        }
      })
      client.cache.updateQuery({
        query: graphql(`
          query AddQuestionRef {
            questions {
              edges {
                node {
                  id
                }
              }
            }
          }
        `)
      }, (data) => {
        return {
          questions: {
            edges: [{ node: { __ref: ref, id: `${res.id}` } }, ...(data?.questions?.edges || [])]
          }
        }
      })
      navigate('/question-details/'+res.id, { replace: true })
    })
    return prom
  }, [questionsApi])

  return (
    <RichTextEditor
      onPublish={publishQuestionCB}
      afterPublish={res => {}}
      enableTags
      enableTitle
      onCancel={handleCancelation}
    />
  )
}