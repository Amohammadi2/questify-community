import PageLoader from "../../PageLoader"
import { EditorContent } from "@tiptap/react"
import { ConfirmationButtonGroup } from "./ConfirmationButtonGroup"
import { useAnswerContent } from "../hooks/useAnswerContent"
import { useEffect } from "react"

export interface IAnswerFormProps {
  qid: string | null; // question id
  /**
   * @description answer id
   */
  aid: string | null;
  content?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export function AnswerForm({qid, aid, content, onSubmit, onCancel} : IAnswerFormProps) {
  
  const { editor, publishChanges, loading, clearForm, publishable } = useAnswerContent(qid, aid)

  const cancelForm = () => {
    clearForm()
    onCancel && onCancel()
  }

  const handlePublish = () => {
    return publishChanges()
    .then(() => {
      clearForm()
      onSubmit && onSubmit()
    })
  }

  // load answer content if we are editing an already existing one
  useEffect(() => {
    if (content) {
      editor?.commands.setContent(content)
    }
  }, [content, editor])

  return (
      <>
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
      </>
  )
}