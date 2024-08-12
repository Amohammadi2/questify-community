import { $answersApi, $questionsApi } from "@/apis"
import { AnswerRead, QuestionRead } from "@/gen"
import { useApi } from "@/hooks/useApi"
import { Avatar, Container, Grid, Typography, Button } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import Answer from "@/components/Answer"
import { $userProfile } from "@/store/user-profile.store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import QuestionDetails from "@/components/QuestionDetails"
import { $isAuthenticated } from "@/store/auth.store"
import { Reference, useQuery } from "@apollo/client"
import { GET_QUESTION_DETAILS } from "@/graphql/get-question-details"
import { toQuestionDetails } from "@/utils/mappers/to-question-details"
import { answerEdgeToAnswerDetailsArray } from "@/utils/mappers/answer-edge-to-answer-details"
import { graphql } from "@/gen/gql"
import { AnswerType, AnswerTypeConnection, AnswerTypeEdge } from "@/gen/gql/graphql"
import InfiniteScroll from "react-infinite-scroll-component"
import AnswerQuestionBox from "@/components/AnswerQuestionBox"

interface ToggleAnswerData {
  questionId: string
  id: string
  accepted: boolean
}

export default function QuestionDetailsPage() {
  
  const { qid } = useParams()
  const isAuthenticated = useRecoilValue($isAuthenticated)
  const userProfile = useRecoilValue($userProfile)
  const navigate = useNavigate()
  const answersApi = useRecoilValue($answersApi)
  const { loading, data, client, fetchMore } = useQuery(GET_QUESTION_DETAILS, { variables: { id: qid || '-1' }})
  
  const deleteAnswer = (id: number): Promise<void> => {
    answersApi.answersDestroy({ id })
    .then(() => {}) // Todo: Toast success
    .catch() // Todo: Toast error

    console.log(data)

    const answerData = data?.question?.answers?.edges.find(e => Number.parseInt(`${e?.node?.id}`) === id)?.node as AnswerType

    client.cache.modify({
      id: client.cache.identify({__typename: 'QuestionType', id: qid }),
      fields: {
        hasAcceptedAnswer(val) { return answerData?.accepted ? false : val },
        numAnswers(n) { return n-1 },
        answers(answers: AnswerTypeConnection, { readField }) {
          return {
            ...answers,
            edges: answers.edges.filter(e => {
              return readField('id', (e?.node as unknown as Reference)) !== `${id}`
            })
          } as AnswerTypeConnection
        }
      }
    })

    return new Promise((res)=>res())
  }

  const toggleAcceptAnswer = ({ id, questionId, accepted } : ToggleAnswerData) => {
    answersApi.answersAcceptCreate({
      id: Number.parseInt(id || '-1'),
      acceptAnswerRequest: {
        accepted: !accepted
      }
    })
    .then(() => {
      client.cache.modify({
        id: client.cache.identify({__typename: 'AnswerType', id }),
        fields: {
          accepted() {
            return !accepted 
          }
        }
      })
      data?.question?.answers?.edges?.forEach((ans) => {
        if (ans?.node?.id == id) return // don't deactivate the accepted answer
        client.cache.modify({
          id: client.cache.identify({__typename: 'AnswerType', id: ans?.node?.id }),
          fields: {
            accepted() { return false }
          }
        })
      })
      client.cache.modify({
        id: client.cache.identify({__typename: 'QuestionType', id: questionId }),
        fields: {
          hasAcceptedAnswer() {
            return !accepted
          },
        }
      })
    })
    // Todo: toast success or failure state
  }
  
  if (!qid)
    return <Container><Typography>همچین سوالی پیدا نشد</Typography></Container>

  return (
    <Container maxWidth='md' sx={{ mb: 10 }}>
      
      {loading || !data?.question
        ? (
          <Typography>در حال بارگزاری</Typography>
        )
        : (
          <>
            <QuestionDetails {...toQuestionDetails(data)} opMode={data.question.author?.username === userProfile?.username}/>
            {isAuthenticated && <AnswerQuestionBox />}
            <InfiniteScroll
              dataLength={data?.question?.answers?.edges.length || 0}
              next={()=>fetchMore({ variables: { answerAfter: data.question?.answers?.pageInfo.endCursor }})}
              hasMore={data.question.answers?.pageInfo.hasNextPage || false}
              endMessage={<></>}
              loader={<h3 style={{textAlign: 'center', fontFamily:'Vazirmatn'}}>در حال بارگزاری ...</h3>}
              style={{ padding: '5px 10px' }}
            >
              {answerEdgeToAnswerDetailsArray(data).map(
                a => <Answer
                  {...a}
                  questionId={qid || ''}
                  opMode={data?.question?.author?.username === userProfile?.username}
                  authorMode={a.author?.username == userProfile?.username}
                  key={a?.id}
                  onDelete={deleteAnswer}
                  toggleAcceptAnswer={(accepted: boolean) => toggleAcceptAnswer({ questionId: qid || '', id: a?.id, accepted })}
                />
              )}
            </InfiniteScroll>
          </>
        )
      }
    </Container>
  )
}