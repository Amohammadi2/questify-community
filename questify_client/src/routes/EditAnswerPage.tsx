import { $answersApi } from "@/apis";
import RichTextEditor, { ContentAggregate } from "@/components/RichTextEditor";
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
  
  const { qid } = useParams()

  const answersApi = useRecoilValue($answersApi)

  const fetchAnswerCB = useCallback(() => {
    return answersApi.answersRetrieve({
      id: Number.parseInt(qid || '-1')
    })
  }, [qid])

  const updateAnswerCB = useCallback(({ content }: ContentAggregate) => {
    return answersApi.answersUpdate({
      id: Number.parseInt(qid || '-1'),
      answerWriteRequest: {
        htmlContent: content,
      }
    })
  }, [answersApi])


  return (
    <RichTextEditor
      onInit={fetchAnswerCB}
      onInitError={handleLoadingError}
      onPublish={updateAnswerCB}
      afterPublish={res => navigate('/question-details/'+res.question)}
      onCancel={handleCancelation}
      submitButtonText="انتشار پاسخ"
    />
  )
}