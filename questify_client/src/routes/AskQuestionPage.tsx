import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@/styles/editor.css";
import { Container } from "@mui/material";



export default function AskQuestionPage() {
  
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  
  return (
    <Container sx={{ height: '500px' }}>
      <Editor
        editorState={editorState}
        toolbarClassName="rdw-toolbar"
        wrapperClassName="wrapperClassName"
        editorClassName="rdw-editor"
        onEditorStateChange={setEditorState}
      />
    </Container>
  )
}