import { $answersApi, $questionsApi } from "@/apis"
import RichTextEditor, { ContentAggregate } from "@/components/RichTextEditor"
import { useCallback, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"

export default function AnswerQuestionPage() {
  
  const navigate = useNavigate()
  const { qid } = useParams()
  const answersApi = useRecoilValue($answersApi)
  const questionsApi = useRecoilValue($questionsApi)

  const postAnswerCB = useCallback(({ content } : ContentAggregate) => {
    return answersApi.answersCreate({
      answerWriteRequest: {
        htmlContent: content,
        question: Number.parseInt(qid || '0')
      }
    })
  }, [answersApi, qid])


  useEffect(() => {
    questionsApi
      .questionsRetrieve({ id: Number.parseInt(qid || '-1') })
      .catch(() => navigate('/questions')) // the only error that can happen is 404
  }, [qid])

  return (
    <RichTextEditor
      onPublish={postAnswerCB}
      afterPublish={res => navigate('/question-details/'+qid)}
      onCancel={() => navigate(-1)}
      submitButtonText="انتشار پاسخ"
    />
  )
}