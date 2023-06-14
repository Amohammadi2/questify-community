import { $questionsApi } from "@/apis";
import { QuestionRead } from "@/gen";
import { useApi } from "@/hooks/useApi";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";


export interface QuestionDetailsProps {
  qid: string
  onLoad?: (question: QuestionRead | null) => void
}

export default function QuestionDetails({ qid, onLoad } : QuestionDetailsProps) {
  
  const navigate = useNavigate()

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

  useEffect(() => {
    onLoad && onLoad(questionData)
  }, [questionData])
  
  return (
    questionLoading
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
          <Grid container sx={{ mt: 1, mb: 3 }}>
            <IconButton sx={{ mr: .5 }}>
              <FontAwesomeIcon
                icon={faTrashCan}
                style={{ fontSize: 16 }}
              />
            </IconButton>
            <IconButton sx={{ mr: .5 }} onClick={() => navigate('/edit-question/'+qid)}>
              <FontAwesomeIcon
                icon={faPen}
                style={{ fontSize: 16 }}
              />
            </IconButton>
          </Grid>
        </Grid>
      )
  )
}