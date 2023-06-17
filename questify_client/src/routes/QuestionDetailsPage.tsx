import { $answersApi, $questionsApi } from "@/apis"
import { AnswerRead, QuestionRead } from "@/gen"
import { useApi } from "@/hooks/useApi"
import { Avatar, Container, Grid, Typography, Button } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import "@/styles/editor.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import Answer from "@/components/Answer"
import { $userProfile } from "@/store/user-profile.store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import QuestionDetails from "@/components/QuestionDetails"
import { $isAuthenticated } from "@/store/auth.store"

export default function QuestionDetailsPage() {
  
  const { qid } = useParams()

  const isAuthenticated = useRecoilValue($isAuthenticated)
  const userProfile = useRecoilValue($userProfile)
  const navigate = useNavigate()

  if (!qid)
    return <Container><Typography>همچین سوالی پیدا نشد</Typography></Container>

  const [questionData, setQuestionData] = useState<QuestionRead | null>()

  const answersApi = useRecoilValue($answersApi)

  const [answersPage, setAnswersPage] = useState(1)

  const fetchAnswersCB = useCallback(() => {
    return answersApi.answersForQuestionList({
      qid: Number.parseInt(qid),
      limit: 5,
      offset: (answersPage - 1) * 5
    })
  }, [qid, answersPage])

  const [answers, setAnswers] = useState<AnswerRead[]>([])

  const [fetchAnswers, { response: answersData, loading: answersLoading, error: answersError}] = useApi(fetchAnswersCB)

  useEffect(() => {
    fetchAnswers()
  }, [answersPage])

  useEffect(() => {
      const results = answersData?.results || []
      setAnswers(q => [...q, ...results])
  }, [answersData])

  const nextAnswersPage = () => {
    setAnswersPage(p => p+1)
  }

  return (
    <Container maxWidth='md' sx={{ mb: 5 }}>
      <QuestionDetails qid={qid || ''} onLoad={setQuestionData} opMode={questionData?.author.username === userProfile?.username} onError={()=>navigate(-1)}/>
      {answersLoading
        ? (
          <Typography>در حال بارگزاری</Typography>
        )
        : (
          answersData?.results?.map(
            a => <Answer
              {...a}
              opMode={questionData?.author.username === userProfile?.username}
              authorMode={a.author.username == userProfile?.username}
              key={a.id}
            />
          )
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