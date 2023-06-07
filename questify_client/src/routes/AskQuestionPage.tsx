import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@/styles/editor.css";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";



export default function AskQuestionPage() {
  
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  
  return (
    <Container sx={{ height: '500px', mt: 2 }}>
      <TextField label="عنوان سوال" sx={{ width: '100%' }} inputProps={{ style: { fontSize: 30 }}} InputLabelProps={{ style: { top: '5px' } }}/>
      <Editor
        editorState={editorState}
        toolbarClassName="rdw-toolbar"
        wrapperClassName="wrapperClassName"
        editorClassName="rdw-editor"
        onEditorStateChange={setEditorState}
      />
      <Grid container sx={{ mt: 2 }}>
        <Button variant="outlined" color="primary" sx={{ mr: 1}}>
          <Typography sx={{ mr: 1 }}>انتشار سوال</Typography>
          <FontAwesomeIcon
            icon={faCheck} />
        </Button>
        <Button variant="outlined" color="error" sx={{ mr: 1}}>
          <Typography sx={{ mr: 1 }}>انصراف</Typography>
          <FontAwesomeIcon
              icon={faTimes} />
        </Button>
      </Grid>
    </Container>
  )
}