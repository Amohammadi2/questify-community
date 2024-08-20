import { Grid, Card, Divider } from "@mui/material"
import { useQuestionContent } from "../hooks/useQuestionContent"
import PageLoader from "../../PageLoader"
import { TagInput } from "./TagInput"
import { ConfirmationButtonGroup } from "./ConfirmationButtonGroup"
import { TitleInput } from "./TitleInput"
import { useNavigate } from "react-router-dom"
import { TextEditor } from "@/components/text-editor"
import { LinkMaker } from "@/utils/link-maker"


export interface IQuestionFormProps {
  qid: string | null
}

export default function QuestionForm({ qid } : IQuestionFormProps) {
  
  const { titleState: [title, setTitle], tagsState: [tags, setTags], editor, publishChanges, loading, clearForm, publishable } = useQuestionContent(qid)
  const navigate = useNavigate()

  const cancelForm = () => {
    clearForm()
    navigate(-1)
  }

  const handlePublish = () => {
    return publishChanges()
    .then(id => navigate(LinkMaker.questionDetails(id.toString()), { replace: true }))
  }

  return (
    <Grid sx={{ mt: 2, px: '10px', mb: 5}}>
      <Card sx={{ py: 2, px: 3, borderRadius: 2}}>
        {loading && <PageLoader fixed />}
        <TitleInput {...{title, setTitle}} />
        <TagInput {...{tags, setTags}} />
        <Divider sx={{ mt: 1, mb: 3 }}/>
        <TextEditor editor={editor} />
        <ConfirmationButtonGroup
          publishable={publishable}
          cancelable={!editor?.isEmpty}
          publishText="انتشار سوال"
          cancelText="انصراف"
          onCancel={cancelForm}
          onPublish={handlePublish}
        />
      </Card>
    </Grid>
  )

}