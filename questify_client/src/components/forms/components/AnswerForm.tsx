import { Grid, Card, Divider } from "@mui/material"
import PageLoader from "../../PageLoader"
import { EditorContent } from "@tiptap/react"
import { ConfirmationButtonGroup } from "./ConfirmationButtonGroup"
import { useAnswerContent } from "../hooks/useAnswerContent"

export interface IAnswerFormProps {
  qid: string | null; // question id
  /**
   * @description answer id
   */
  aid: string | null;
}

export function AnswerForm({qid, aid} : IAnswerFormProps) {
  
  const { editor, publishChanges, loading, clearForm, publishable } = useAnswerContent(qid, aid)

  const cancelForm = () => {
    clearForm()
  }

  const handlePublish = () => {
    return publishChanges()
    .then(() => clearForm())
  }

  return (
    <Grid sx={{ mt: 2, px: '10px'}}>
      <Card sx={{ py: 2, px: 3, borderRadius: 2}}>
        {loading && <PageLoader fixed />}
        <EditorContent editor={editor} />
        <ConfirmationButtonGroup
          publishable={publishable}
          cancelable={!editor?.isEmpty}
          publishText="انتشار پاسخ"
          cancelText="انصراف"
          onCancel={cancelForm}
          onPublish={handlePublish}
        />
      </Card>
    </Grid>
  )
}