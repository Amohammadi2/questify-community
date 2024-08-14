import { Grid, Card, Divider } from "@mui/material"
import { useQuestionContent } from "../hooks/useQuestionContent"
import PageLoader from "../../PageLoader"
import { TagInput } from "./TagInput"
import { EditorContent } from "@tiptap/react"
import { ConfirmationButtonGroup } from "./ConfirmationButtonGroup"
import { TitleInput } from "./TitleInput"
import { useNavigate } from "react-router-dom"


export interface IQuestionFormProps {
  qid: string | null
}

export function QuestionForm({ qid } : IQuestionFormProps) {
  
  const { titleState: [title, setTitle], tagsState: [tags, setTags], editor, publishChanges, loading, clearForm, publishable } = useQuestionContent(qid)
  const navigate = useNavigate()

  const cancelForm = () => {
    clearForm()
    navigate(-1)
  }

  const handlePublish = () => {
    return publishChanges()
    .then(() => navigate(-1))
  }

  return (
    <Grid sx={{ mt: 2, px: '10px'}}>
      <Card sx={{ py: 2, px: 3, borderRadius: 2}}>
        {loading && <PageLoader fixed />}
        <TitleInput {...{title, setTitle}} />
        <TagInput {...{tags, setTags}} />
        <Divider sx={{ mt: 1, mb: 3 }}/>
        <EditorContent editor={editor} />
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