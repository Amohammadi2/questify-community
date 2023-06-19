import { $questionsApi } from "@/apis";
import { QuestionRead } from "@/gen";
import { useApi } from "@/hooks/useApi";
import { useModal } from "@/hooks/useModal";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ConfirmationModal from "./ConfirmationModal";


export interface QuestionDetailsProps {
  qid: string
  onLoad?: (question: QuestionRead | null) => void
  onError?: (err: any) => void
  opMode?: boolean
}

export default function QuestionDetails({ qid, onLoad, onError, opMode=false } : QuestionDetailsProps) {

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

  useEffect(() => {
    if (questionError)
      onError && onError(questionError)
  }, [questionError])

  const [openDeleteModal, deleteModalState] = useModal()

  const deleteQuestionCB = useCallback(() => {
    return questionsApi.questionsDestroy({
      id: questionData?.id || -1
    })
  }, [questionsApi, questionData])

  const [deleteQuestion,] = useApi(deleteQuestionCB, {
    then() {
      navigate('/questions')
      // Todo: Toast a success notif
    },
  })

  return (
    <>
      <ConfirmationModal
        {...deleteModalState}
        actionText="حذف سوال"
        onConfirm={deleteQuestion}
        content="آیا مطمئنید که می خواهید این سوال را حذف کنید؟ این عمل غیر قابل بازگشت می باشد"
        title="سوال حذف شود؟"
        negativeAction
      />
      {questionLoading
      ? (
        <Typography>در حال بارگزاری</Typography>
      )
      : (
        <Grid container direction="column" sx={{ mt: 1 }}>
          <Grid container direction="row" alignItems={'center'} sx={{ mb: 2 }}>
            <Avatar alt={questionData?.author.username} sx={{ width: 30, height: 30}} />
            <Typography sx={{ ml: 1 }}>{questionData?.author.username}</Typography>
          </Grid>
          <Grid container>
            <Typography variant="h5" sx={{ ml: 2 }}>{questionData?.title}</Typography>
          </Grid>
          <div dangerouslySetInnerHTML={{ __html: questionData?.htmlContent || '' }} className="content-displayer rdw-editor-main" />
          {/* {opMode && <Grid container sx={{ mt: 1, mb: 3 }}>
            <IconButton sx={{ mr: .5 }} onClick={openDeleteModal}>
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
          </Grid>} */}
        </Grid>
      )}
    </>
  )
}