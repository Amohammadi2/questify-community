import { $questionsApi } from "@/apis";
import RichTextEditor, { ContentAggregate } from "@/components/RichTextEditor";
import { useApi } from "@/hooks/useApi";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function EditQuestionPage() {
  
  const navigate = useNavigate()

  const handleCancelation = () => {
    navigate(-1)
  }

  const handleLoadingError = () => {
    handleCancelation()
  }
  
  const { qid } = useParams()

  const questionsApi = useRecoilValue($questionsApi)

  const fetchQuestionCB = useCallback(() => {
    return questionsApi.questionsRetrieve({
      id: Number.parseInt(qid || '-1')
    })
  }, [qid])

  const updateQuestionCB = useCallback(({ content, tags, title }: ContentAggregate) => {
    return questionsApi.questionsUpdate({
      id: Number.parseInt(qid || '-1'),
      questionWriteRequest: {
        title,
        htmlContent: content,
        tags
      }
    })
  }, [questionsApi])


  return (
    <RichTextEditor
      onInit={fetchQuestionCB}
      onInitError={handleLoadingError}
      onPublish={updateQuestionCB}
      afterPublish={res => navigate('/question-details/'+res.id)}
      enableTags
      enableTitle
      onCancel={handleCancelation}
    />
  )
}