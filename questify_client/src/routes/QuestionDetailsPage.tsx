import { $answersApi, $questionsApi } from "@/apis"
import { AnswerRead } from "@/gen"
import { useApi } from "@/hooks/useApi"
import { Avatar, Container, Grid, Typography, Button } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import "@/styles/editor.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import Answer from "@/components/Answer"
import { $userProfile } from "@/store/user-profile.store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

export default function QuestionDetailsPage() {
  
  const { qid } = useParams()

  const userProfile = useRecoilValue($userProfile)

  if (!qid)
    return <Container><Typography>همچین سوالی پیدا نشد</Typography></Container>

  const questionsApi = useRecoilValue($questionsApi)

  const fetchQuestionCB = useCallback(() => {
    return questionsApi.questionsRetrieve({
      id: Number.parseInt(qid)
    })
  }, [qid])

  const [fetchQuestion, { response: questionData, loading: questionLoading, error: questionError }] = useApi(fetchQuestionCB)
  
  useEffect(() => {
    fetchQuestion()
  }, [qid])


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
    <Container maxWidth='md'>
      {questionLoading
        ? (
          <Typography>در حال بارگزاری</Typography>
        )
        : (
          <Grid container direction="column" sx={{ mt: 1 }}>
            <Grid container direction="row" alignItems={'center'} sx={{ mb: 2 }}>
              <Avatar alt={questionData?.author.username} />
              <Typography variant="h6" sx={{ ml: 1 }}>{questionData?.author.username}</Typography>
              <Typography variant="h3" sx={{ ml: 2 }}>{questionData?.title}</Typography>
            </Grid>
            <div dangerouslySetInnerHTML={{ __html: questionData?.htmlContent || '' }} className="content-displayer rdw-editor-main" />
          </Grid>
        )
      }
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
            />
          )
        )
      }
      <Button variant="contained" color="primary" size="large" sx={{ position: 'fixed', bottom: 20, left: '50%', transform:'translateX(-50%)', width: '300px' }} href={"/answer/"+qid}>
        <Typography sx={{ mr: 1 }}>ارسال پاسخ</Typography>
        <FontAwesomeIcon
          icon={faPaperPlane}
        />
      </Button>
    </Container>
  )
}