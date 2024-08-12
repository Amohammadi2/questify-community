import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { $questionsApi } from "@/apis"
import RichTextEditor, { ContentAggregate } from "@/components/RichTextEditor"
import { client } from "@/apollo/client"
import { graphql } from "@/gen/gql"
import { $userProfile } from "@/store/user-profile.store"
import { Container } from "@mui/material"
import { DocumentNode, gql, TypedDocumentNode } from "@apollo/client"



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
      const authorRef = client.writeFragment({
        id: `UserType:${userProfile?.id}`,
        fragment: gql`
          fragment CreateAuthor on UserType {
            id
            username
            __typename
          }
        `,
        data: {
          id: `${userProfile?.id}`,
          username: userProfile?.username,
          __typename: 'UserType'
        }
      })
      const questionRef = client.writeFragment({
        id: `QuestionType:${res.id}`,
        fragment: gql`
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
              __typename
              username
              id
            }
          }
        `,
        data: {
          __typename: 'QuestionType',
          htmlContent: content,
          tags: JSON.stringify(tags),
          title,
          id: `${res.id}`,
          created: new Date().toLocaleDateString('fa-IR'),
          updated: new Date().toLocaleDateString('fa-IR'),
          author: authorRef,
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
            edges: [{ node: { __ref: questionRef, id: `${res.id}` } }, ...(data?.questions?.edges || [])]
          }
        }
      })
      navigate('/question-details/'+res.id, { replace: true })
    })
    return prom
  }, [questionsApi])

  return (
    <Container>
      <RichTextEditor
        onPublish={publishQuestionCB}
        afterPublish={res => {}}
        enableTags
        enableTitle
        onCancel={handleCancelation}
      />
    </Container>
  )
}