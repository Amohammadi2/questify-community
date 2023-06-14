import { $answersApi } from "@/apis"
import RichTextEditor, { ContentAggregate } from "@/components/RichTextEditor"
import { useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"

export default function AnswerQuestionPage() {
  
  const navigate = useNavigate()
  const { qid } = useParams()
  const answersApi = useRecoilValue($answersApi)

  const postAnswerCB = useCallback(({ content } : ContentAggregate) => {
    return answersApi.answersCreate({
      answerWriteRequest: {
        htmlContent: content,
        question: Number.parseInt(qid || '0')
      }
    })
  }, [answersApi, qid])

  return (
    <RichTextEditor
      onPublish={postAnswerCB}
      afterPublish={res => navigate('/question-details/'+qid)}
      onCancel={() => navigate(-1)}
      submitButtonText="انتشار جواب"
    />
  )
}