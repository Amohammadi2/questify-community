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
import { useQuery } from "@apollo/client"
import { GET_QUESTION_DETAILS } from "@/graphql/get-question-details"
import { toQuestionDetails } from "@/utils/mappers/to-question-details"
import { answerEdgeToAnswerDetailsArray } from "@/utils/mappers/answer-edge-to-answer-details"

export default function QuestionDetailsPage() {
  
  const { qid } = useParams()
  const isAuthenticated = useRecoilValue($isAuthenticated)
  const userProfile = useRecoilValue($userProfile)
  const navigate = useNavigate()
  const answersApi = useRecoilValue($answersApi)
  const { loading, data, client, fetchMore } = useQuery(GET_QUESTION_DETAILS, { variables: { id: qid || '-1' }})
  
  const deleteAnswer = (id: number): Promise<void> => {
    return answersApi.answersDestroy({ id })
    .then() // Todo: toast success, rewrite cache
    .catch() // Todo: Toast error
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
            {answerEdgeToAnswerDetailsArray(data).map(
              a => <Answer
                {...a}
                opMode={data?.question?.author?.username === userProfile?.username}
                authorMode={a.author?.username == userProfile?.username}
                key={a?.id}
                onDelete={deleteAnswer}
              />
            )}
          </>
        )
      }
      {isAuthenticated && <Button variant="contained" color="primary" size="large" sx={{ position: 'fixed', bottom: 20, left: '50%', transform:'translateX(-50%)', width: '300px' }} href={"/answer/"+qid}>
        <Typography sx={{ mr: 1 }}>ارسال پاسخ</Typography>
        <FontAwesomeIcon
          icon={faPaperPlane}
        />
      </Button>}
    </Container>
  )
}