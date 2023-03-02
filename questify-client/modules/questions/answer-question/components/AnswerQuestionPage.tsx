import { FlexContainer } from "modules/app-ui";
import { useRichTextEditor } from "modules/questions/question-editor";
import { EditorCommandsToolbar } from "modules/questions/question-editor/editor-commands";
import { EditorInput } from "modules/questions/question-editor/editor-input";
import { useRouter } from "next/router";
import QuestionContent from "./QuestionContent";

export default function AnswerQuestionPage() {

  const { query } = useRouter()


  const editor = useRichTextEditor({
    placholder: 'پاسخ خود را اینجا وارد کنید...'
  });

  return (
    <FlexContainer>
      <QuestionContent questionId={query.qid as string} />
      <EditorInput editor={editor} />
      <EditorCommandsToolbar editor={editor} />
    </FlexContainer>
  )
}