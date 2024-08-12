import { $questionsApi } from "@/apis";
import { useApi } from "@/hooks/useApi";
import { useModal } from "@/hooks/useModal";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ConfirmationModal from "./ConfirmationModal";
import "@/styles/ProseMirror.css"
import type { QuestionDetails } from "@/utils/mappers/to-question-details";
import { client } from "@/apollo/client";

export interface QuestionDetailsProps extends QuestionDetails {
  opMode?: boolean
}


export default function QuestionDetails({ id, opMode=false, author, title, htmlContent, created } : QuestionDetailsProps) {

  const navigate = useNavigate()

  const questionsApi = useRecoilValue($questionsApi)

  const [openDeleteModal, deleteModalState] = useModal()

  const deleteQuestionCB = useCallback(() => {
    return questionsApi.questionsDestroy({
      id: Number.parseInt(id)
    })
  }, [questionsApi, id])

  const [deleteQuestion,] = useApi(deleteQuestionCB, {
    then() {
      client.cache.evict({ id: client.cache.identify({__typename: 'QuestionType', id}) })
      client.cache.gc()
      navigate('/questions', { replace: true })
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
      <Grid container direction="column" sx={{ mt: 4 }}>
        <Grid container direction="row" alignItems={'center'} sx={{ mb: 2 }}>
          <Avatar alt={author.username} sx={{ width: 30, height: 30}} />
          <Typography sx={{ ml: 1 }}>{author.username}</Typography>
          <div style={{flexGrow: '1'}} />
          <Typography></Typography>
        </Grid>
        <Grid container>
          <Typography variant="h5" sx={{ ml: 2, mb:2, fontWeight: 800 }}>{title}</Typography>
        </Grid>
        <div dangerouslySetInnerHTML={{ __html: htmlContent || '' }} className="ProseMirror" />
        {/* Todo: replace these buttons with a menu */}
        {opMode && <Grid container sx={{ mt: 1, mb: 3 }}>
          <IconButton sx={{ mr: .5 }} onClick={openDeleteModal}>
            <FontAwesomeIcon
              icon={faTrashCan}
              style={{ fontSize: 16 }}
            />
          </IconButton>
          <IconButton sx={{ mr: .5 }} onClick={() => navigate('/edit-question/'+id)}>
            <FontAwesomeIcon
              icon={faPen}
              style={{ fontSize: 16 }}
            />
          </IconButton>
        </Grid>}
      </Grid>
    </>
  )
}