import { useCallback, useEffect, useState } from "react"
import { Button, Container, Grid, TextField, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { EditorContent } from "@tiptap/react"
import PageLoader from "./PageLoader"
import { useRichTextEditor } from "../hooks/useRichTextEditor"
import "@/styles/ProseMirror.css"

type IsPost = ()=>Promise<{htmlContent: string, title?: string, tags?: Array<string>}>

export type ContentAggregate = {
  content: string
  tags: Array<string>
  title: string
}

interface RichTextEditorProps <TPublish extends (content: ContentAggregate) => Promise<any>> {
  /**
   * @description IMPORTANT NOTICE : always use `useCallback` hook to avoid unnecessary rerenders
   */
  onInit?: IsPost | null
  onInitError?: (err: any) => void
  onPublish: TPublish
  afterPublish?:(res: TPublish extends ((content: ContentAggregate) => Promise<infer T>) ? T : any) => void
  onCancel?: () => void
  enableTags?: boolean
  enableTitle?: boolean
  submitButtonText?: string
}


export default function RichTextEditor <TPublish extends (content: ContentAggregate) => Promise<any>>
  ({ onPublish, afterPublish, onInit, enableTags=false, enableTitle=false, onCancel, submitButtonText="انتشار سوال", onInitError} : RichTextEditorProps<TPublish>)
{
  
  const [contentLoading, setContentLoading] = useState(false)
  const editor = useRichTextEditor()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>(['تست', 'سیستم', 'انتزاع'])

  // initialize the editor state
  useEffect(() => {
    if (onInit) {
      setContentLoading(true)
      onInit()
        .then(res => {
          editor?.commands.setContent(res.htmlContent)
          setTitle(res.title || '')
          setTags(res.tags || [])
        })
        .catch(onInitError)
        .finally(()=>setContentLoading(false))
    }
  }, [onInit, editor])


  const canPublish = Boolean(
    !editor?.isEmpty &&
    (enableTitle ? Boolean(title) : true) &&
    (enableTags ? Boolean(tags.length) : true)
  )

  const [publishError, setPublishError] = useState<any>()
  const [publishLoading, setPublishLoading] = useState<boolean>(false)

  const publish = useCallback(() => {
    setPublishLoading(true)
    onPublish({
      title,
      content: editor?.getHTML() || '',
      tags
    })
      .then(res => afterPublish && afterPublish(res))
      .catch(e => setPublishError(e))
      .finally(()=>setPublishLoading(false))
  }, [onPublish, title, tags, editor])

  return (
    <Container sx={{ height: '500px', mt: 2 }}>
      {contentLoading && <PageLoader fixed />}
      {enableTitle && <TextField label="عنوان سوال" sx={{ width: '100%' }} inputProps={{ style: { fontSize: 30 }}} InputLabelProps={{ style: { top: '5px' } }} value={title} onChange={e=>setTitle(e.currentTarget.value)}/>}
      <EditorContent editor={editor} />
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


