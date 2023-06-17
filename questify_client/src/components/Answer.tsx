import { AnswerRead } from "@/gen"
import { useModal } from "@/hooks/useModal";
import { faCheckSquare, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Grid, IconButton, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { useRecoilValue } from "recoil";
import { $answersApi } from "@/apis";
import { useCallback } from "react";

interface AnswerProps extends AnswerRead {
  opMode?: boolean
  authorMode?: boolean
  onDelete: (id: number) => Promise<any>
}

export default function Answer({ htmlContent, author, id, created, updated, accepted, opMode=false, authorMode=false, onDelete } : AnswerProps) {
  
  const navigate = useNavigate()
  const [openDeleteModal, deleteModalState] = useModal()
  const answersApi = useRecoilValue($answersApi)
  
  return (
    <>
      <ConfirmationModal
        {...deleteModalState}
        actionText="حذف پاسخ"
        onConfirm={()=>onDelete(id)}
        content="آیا مطمئنید که می خواهید پاسخ خود را حذف کنید؟ این عمل غیر قابل بازگشت می باشد"
        title="پاسخ حذف شود؟"
        negativeAction
      />
      <Grid container direction="column" sx={{ boxShadow: 1, borderRadius: 3, py: 2, px: 2.5, mt: 2 }}>
        <Grid container direction="row" alignItems={'center'} sx={{ mb: 2 }}>
          <Avatar alt={author.username} />
          <Typography sx={{ flexGrow: 1, ml: 1 }}>{author.username}</Typography>
        </Grid>
        <Grid container direction="row" alignItems='center'>
          {opMode && <Grid item sx={{ mr: 2 }}>
            <FontAwesomeIcon
              icon={faCheckSquare}
              style={{
                color: accepted ? 'green' : 'rgb(220,220,220)'
              }}
            />
          </Grid>}
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
          <IconButton sx={{ mr: .5 }} onClick={()=>navigate('/edit-answer/'+id)}>
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