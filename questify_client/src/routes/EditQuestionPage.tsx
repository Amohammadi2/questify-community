import { $questionsApi } from "@/apis";
import { client } from "@/apollo/client";
import RichTextEditor, { ContentAggregate } from "@/components/RichTextEditor";
import { QuestionWrite } from "@/gen";
import { useApi } from "@/hooks/useApi";
import { Container } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function EditQuestionPage() {
  
  const navigate = useNavigate()

  const handleCancelation = () => {
    navigate(-1)
  }

  const handleLoadingError = () => {
    navigate('/questions')
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


  const afterPublish = (res: QuestionWrite): void => {
    client.cache.modify({
      id: client.cache.identify({ __typename: 'QuestionType', id: qid || '' }),
      fields: {
        title() {
          return res.title
        },
        htmlContent() {
          return res.htmlContent
        },
        tags() {
          return JSON.stringify(res.tags)
        }
      }
    })
    return navigate('/question-details/' + res.id, { replace: true })
  }

  return (
    <Container>
      <RichTextEditor
        onInit={fetchQuestionCB}
        onInitError={handleLoadingError}
        onPublish={updateQuestionCB}
        afterPublish={afterPublish}
        enableTags
        enableTitle
        onCancel={handleCancelation}
      />
    </Container>
  )
}