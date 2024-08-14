import { AnswerRead } from "@/gen"
import { useModal } from "@/hooks/useModal";
import { faCheckSquare, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Grid, IconButton, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { useRecoilValue } from "recoil";
import { $answersApi } from "@/apis";
import { useCallback, useEffect, useState } from "react";
import { AnswerType, AnswerTypeConnection } from "@/gen/gql/graphql";
import { AnswerDetails } from "@/utils/mappers/answer-edge-to-answer-details";
import { client } from "@/apollo/client";
import { gql } from "@apollo/client";
import { AnswerForm } from "./forms/components/AnswerForm";

interface AnswerProps extends AnswerDetails {
  opMode?: boolean
  authorMode?: boolean
  onDelete: (id: number) => Promise<any>
  questionId: string
  toggleAcceptAnswer: (accepted: boolean) => any
}

export default function Answer({ htmlContent, author, id, accepted : _accepted, opMode=false, authorMode=false, onDelete, questionId, toggleAcceptAnswer} : AnswerProps) {
  
  const [openDeleteModal, deleteModalState] = useModal()
  const [accepted, setAccepted] = useState(_accepted)

  useEffect(() => {
    setAccepted(_accepted || false)
  }, [_accepted])

  const [editMode, setEditMode] = useState(false)

  
  const toggleAcceptedStatus = () => {
    toggleAcceptAnswer(accepted)
    setAccepted(!accepted)
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
          <Avatar alt={author?.username} />
          <Typography sx={{ flexGrow: 1, ml: 1 }}>{author?.username}</Typography>
        </Grid>
        {editMode ? (
          <AnswerForm qid={questionId} aid={id} content={htmlContent} onCancel={()=>setEditMode(false)} onSubmit={()=>setEditMode(false)}/>
        ) : (
          <>
            <Grid container direction="row" alignItems='center'>
              {opMode && <Grid item sx={{ mr: 2 }}>
                <IconButton onClick={toggleAcceptedStatus}>
                  <FontAwesomeIcon
                    icon={faCheckSquare}
                    style={{
                      color: accepted ? 'green' : 'rgb(220,220,220)'
                    }}
                  />
                </IconButton>
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