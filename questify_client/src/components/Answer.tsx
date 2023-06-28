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

interface AnswerProps extends AnswerDetails {
  opMode?: boolean
  authorMode?: boolean
  onDelete: (id: number) => Promise<any>
  questionId: string
}

export default function Answer({ htmlContent, author, id, accepted : _accepted, opMode=false, authorMode=false, onDelete, questionId } : AnswerProps) {
  
  const navigate = useNavigate()
  const [openDeleteModal, deleteModalState] = useModal()
  const answersApi = useRecoilValue($answersApi)

  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    setAccepted(_accepted || false)
  }, [_accepted])

  const toggleAcceptAnswer = () => {
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
          accepted() { return !accepted }
        }
      })
      client.cache.modify({
        id: client.cache.identify({__typename: 'QuestionType', id: questionId }),
        fields: {
          hasAcceptedAnswer() {
            return !accepted
          },
          answers(answers, { readField }) {
            if (!accepted) {
              answers.edges.forEach((edge: any) => {
                client.cache.modify({
                  id: edge.node.__ref,
                  fields: {
                    accepted() {
                      return readField('id', edge.node) === id ? true : false
                    }
                  }
                })
              })
            }
            return answers
          }
        }
      })
    })
    // Todo: toast success or failure state
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
        <Grid container direction="row" alignItems='center'>
          {opMode && <Grid item sx={{ mr: 2 }}>
            <IconButton onClick={toggleAcceptAnswer}>
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