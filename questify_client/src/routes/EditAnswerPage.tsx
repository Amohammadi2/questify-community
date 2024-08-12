import { $answersApi } from "@/apis";
import { client } from "@/apollo/client";
import RichTextEditor, { ContentAggregate } from "@/components/RichTextEditor";
import { AnswerWrite } from "@/gen";
import { Container } from "@mui/material";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function EditAnswerPage() {
  
  const navigate = useNavigate()

  const handleCancelation = () => {
    navigate(-1)
  }

  const handleLoadingError = () => {
    navigate('/questions')
  }
  
  const { aid: id } = useParams()

  const answersApi = useRecoilValue($answersApi)

  const fetchAnswerCB = useCallback(() => {
    return answersApi.answersRetrieve({
      id: Number.parseInt(id || '-1')
    })
  }, [id])

  const updateAnswerCB = useCallback(({ content }: ContentAggregate) => {
    return answersApi.answersUpdate({
      id: Number.parseInt(id || '-1'),
      answerWriteRequest: {
        htmlContent: content,
      }
    })
  }, [answersApi])

  const afterPublish = (res: AnswerWrite) => {
    // update the cache
    client.cache.modify({
      id: client.cache.identify({ __typename: 'AnswerType', id: id || '' }),
      fields: {
        htmlContent() {
          return res.htmlContent
        }
      }
    })
    navigate('/question-details/'+res.question, { replace: true })
  }

  return (
    <Container>
      <RichTextEditor
        onInit={fetchAnswerCB}
        onInitError={handleLoadingError}
        onPublish={updateAnswerCB}
        afterPublish={afterPublish}
        onCancel={handleCancelation}
        submitButtonText="انتشار پاسخ"
      />
    </Container>
  )
}