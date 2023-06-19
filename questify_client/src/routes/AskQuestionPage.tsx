import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { $questionsApi } from "@/apis"
import RichTextEditor, { ContentAggregate } from "@/components/RichTextEditor"



export default function AskQuestionPage() {
  
  const navigate = useNavigate()

  const handleCancelation = () => {
    navigate(-1)
  }
  
  const questionsApi = useRecoilValue($questionsApi)

  const publishQuestionCB = useCallback(({ content, tags, title }: ContentAggregate) => {
    return questionsApi.questionsCreate({
      questionWriteRequest: {
        title,
        htmlContent: content,
        tags
      }
    })
  }, [questionsApi])

  return (
    <RichTextEditor
      onPublish={publishQuestionCB}
      afterPublish={res => navigate('/question-details/'+res.id, { replace: true })}
      enableTags
      enableTitle
      onCancel={handleCancelation}
    />
  )
}