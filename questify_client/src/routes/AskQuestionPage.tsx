import { useCallback, useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "@/styles/editor.css"
import { Button, Container, Grid, TextField, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { $questionsApi } from "@/apis"
import { useApi } from "@/hooks/useApi"
import { LoadingButton } from "@mui/lab"



export default function AskQuestionPage() {
  
  const navigate = useNavigate()

  const handleCancelation = () => {
    navigate(-1)
  }

  const [title, setTitle] = useState('')
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  
  const questionsApi = useRecoilValue($questionsApi)

  const publishQuestionCB = useCallback(() => {
    return questionsApi.questionsCreate({
      questionWriteRequest: {
        title,
        htmlContent: stateToHTML(editorState.getCurrentContent()),
        tags: ['تست', 'ادیتور متنی']
      }
    })
  }, [editorState, title])

  const [publishQuestionApiCall, { loading, error }] = useApi(publishQuestionCB, {
    then(res) {
      navigate(`/question-details/${res.id}`)
    },
  })

  const canPublish = Boolean(title && editorState.getCurrentContent().getPlainText())

  return (
    <Container sx={{ height: '500px', mt: 2 }}>
      <TextField label="عنوان سوال" sx={{ width: '100%' }} inputProps={{ style: { fontSize: 30 }}} InputLabelProps={{ style: { top: '5px' } }} value={title} onChange={e=>setTitle(e.currentTarget.value)}/>
      <Editor
        editorState={editorState}
        toolbarClassName="rdw-toolbar"
        wrapperClassName="wrapperClassName"
        editorClassName="rdw-editor"
        onEditorStateChange={setEditorState}
      />
      <Grid container sx={{ mt: 2 }}>
        <LoadingButton variant="outlined" color="primary" sx={{ mr: 1}} onClick={publishQuestionApiCall} loading={loading} disabled={!canPublish}>
          <Typography sx={{ mr: 1 }}>انتشار سوال</Typography>
          <FontAwesomeIcon
            icon={faCheck} />
        </LoadingButton>
        <Button variant="outlined" color="error" sx={{ mr: 1}} onClick={handleCancelation}>
          <Typography sx={{ mr: 1 }}>انصراف</Typography>
          <FontAwesomeIcon
              icon={faTimes} />
        </Button>
      </Grid>
      <Grid>
        <Typography color="error">{error?.message}</Typography>
      </Grid>
    </Container>
  )
}