import { ApiResponse } from "@/utils/ApiResponse"
import { EditorState } from "draft-js"
import { Editor } from 'react-draft-wysiwyg'
import { useCallback, useEffect, useState } from "react"
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import { Button, Container, Grid, TextField, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "@/styles/editor.css"

type HasHtmlContent = ()=>Promise<{htmlContent: string}>

export type ContentAggregate = {
  content: string
  tags: Array<string>
  title: string
}

interface RichTextEditorProps <TPublish extends (content: ContentAggregate) => Promise<any>> {
  /**
   * @description IMPORTANT NOTICE : always use `useCallback` hook to avoid unnecessary rerenders
   */
  onInit?: HasHtmlContent | null
  onPublish: TPublish
  afterPublish?:(res: TPublish extends ((content: ContentAggregate) => Promise<infer T>) ? T : any) => void
  onCancel?: () => void
  enableTags?: boolean
  enableTitle?: boolean
  submitButtonText?: string
}


export default function RichTextEditor <TPublish extends (content: ContentAggregate) => Promise<any>>
  ({ onPublish, afterPublish, onInit, enableTags=false, enableTitle=false, onCancel, submitButtonText="انتشار سوال"} : RichTextEditorProps<TPublish>)
{
  
  const [contentLoading, setContentLoading] = useState(true)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  // initialize the editor state
  useEffect(() => {
    if (onInit) {
      setContentLoading(true)
      onInit()
        .then(res => setEditorState(EditorState.createWithContent(stateFromHTML(res.htmlContent))))
        .finally(()=>setContentLoading(false))
    }
  }, [onInit])

  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>(['تست', 'سیستم', 'انتزاع'])

  const canPublish = Boolean(
    editorState.getCurrentContent().getPlainText() &&
    (enableTitle ? Boolean(title) : true) &&
    (enableTags ? Boolean(tags.length) : true)
  )

  const [publishError, setPublishError] = useState<any>()
  const [publishLoading, setPublishLoading] = useState<boolean>(false)

  const publish = useCallback(() => {
    setPublishLoading(true)
    onPublish({
      title,
      content: stateToHTML(editorState.getCurrentContent()),
      tags
    })
      .then(res => afterPublish && afterPublish(res))
      .catch(e => setPublishError(e))
      .finally(()=>setPublishLoading(false))
  }, [onPublish, title, tags, editorState])

  return (
    <Container sx={{ height: '500px', mt: 2 }}>
      {enableTitle && <TextField label="عنوان سوال" sx={{ width: '100%' }} inputProps={{ style: { fontSize: 30 }}} InputLabelProps={{ style: { top: '5px' } }} value={title} onChange={e=>setTitle(e.currentTarget.value)}/>}
      <Editor
        editorState={editorState}
        toolbarClassName="rdw-toolbar"
        wrapperClassName="wrapperClassName"
        editorClassName="rdw-editor"
        onEditorStateChange={setEditorState}
      />
      <Grid container sx={{ mt: 2 }}>
        <LoadingButton variant="outlined" color="primary" sx={{ mr: 1}} onClick={publish} loading={publishLoading} disabled={!canPublish}>
          <Typography sx={{ mr: 1 }}>{submitButtonText}</Typography>
          <FontAwesomeIcon
            icon={faCheck}
          />
        </LoadingButton>
        {onCancel &&
          <Button variant="outlined" color="error" sx={{ mr: 1}} onClick={() => onCancel()}>
            <Typography sx={{ mr: 1 }}>انصراف</Typography>
            <FontAwesomeIcon
                icon={faTimes}
            />
          </Button>
        }
      </Grid>
      {/* Todo: add a tag editor here */}
      <Grid>
        <Typography color="error">{publishError?.message}</Typography>
      </Grid>
    </Container>
  )
}