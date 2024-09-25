import { useModal } from "@/hooks/useModal";
import { faCheckSquare, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Grid, IconButton, Typography } from "@mui/material"
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
import { AnswerDetails } from "@/utils/mappers/answer-edge-to-answer-details";
import { AnswerForm } from "./forms";

interface AnswerProps extends AnswerDetails {
  opMode?: boolean
  authorMode?: boolean
  onDelete: (id: number) => Promise<any>
  questionId: string
  toggleAcceptAnswer: (accepted: boolean) => any
}

/**
 * This component, takes all the data from the parent component and displays an answer object
 * and manages the editing and deleting operations. Since all the data is passed as props,
 * we can't make direct changes to the data, but the data is kept in sync with apollo cache. 
 * For example when the `accepted` state of an answer changes, apollo broadcasts the change to
 * all the graphql queries watching that field, thus making the `accepted` prop to change from outside
 */
export default function Answer({ htmlContent, author, id, accepted, opMode=false, authorMode=false, onDelete, questionId, toggleAcceptAnswer} : AnswerProps) {
  
  const [openDeleteModal, deleteModalState] = useModal()
  const [editMode, setEditMode] = useState(false)
  const toggleAcceptedStatus = () => {
    toggleAcceptAnswer(accepted)
  }

  return (
    <>
      <ConfirmationModal
        {...deleteModalState}
        actionText="حذف پاسخ"
        onConfirm={()=>onDelete(Number.parseInt(id || '-1'))}
        content="آیا مطمئنید که می خواهید پاسخ خود را حذف کنید؟ این عمل غیر قابل بازگشت می باشد"
        title="پاسخ حذف شود؟"
        negativeAction
      />
      <Grid container direction="column" sx={{ boxShadow: 1, borderRadius: 3, py: 2, px: 2.5, mt: 2 }}>
        <Grid container direction="row" alignItems={'center'} sx={{ mb: 2 }}>
          <Avatar alt={author?.username} src={author.profile.profileImg||''} sx={{width: '35px', height: '35px'}} />
          <Typography sx={{ flexGrow: 1, ml: 1 }}>{author?.username}</Typography>
        </Grid>
        {editMode ? (
          <AnswerForm qid={questionId} aid={id} content={htmlContent} onCancel={()=>setEditMode(false)} onSubmit={()=>setEditMode(false)}/>
        ) : (
          <>
            <Grid container direction="row" alignItems='center'>
              <Grid item sx={{ mr: 2 }}>
                <IconButton onClick={toggleAcceptedStatus} disabled={!opMode}>
                  <FontAwesomeIcon
                    icon={faCheckSquare}
                    style={{
                      color: accepted ? 'green' : 'rgb(220,220,220)'
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} style={{ fontFamily: 'Vazirmatn' }} />
              </Grid>
            </Grid>
            {authorMode && <Grid container direction="row" sx={{ borderTop: '1px solid rgb(230,230,230)', mt: 2, pt: 1.5 }}>
              <IconButton sx={{ mr: .5 }} onClick={openDeleteModal}>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ fontSize: 16 }}
                />
              </IconButton>
              <IconButton sx={{ mr: .5 }} onClick={()=>setEditMode(true)}>
                <FontAwesomeIcon
                  icon={faPen}
                  style={{ fontSize: 16 }}
                />
              </IconButton>
            </Grid>}
          </>
        )}
      </Grid>
    </>
  )
}