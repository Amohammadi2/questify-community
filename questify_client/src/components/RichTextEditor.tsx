import { useCallback, useEffect, useState } from "react"
import { Button, Container, Grid, TextField, InputBase, Typography, Card, Badge, Chip, Divider } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { EditorContent } from "@tiptap/react"
import PageLoader from "./PageLoader"
import { useRichTextEditor } from "../hooks/useRichTextEditor"
import "@/styles/ProseMirror.css"
import { TagInput } from "./forms/components/TagInput"

type ReturnsPost = ()=>Promise<{htmlContent: string, title?: string, tags?: Array<string>}>

export type ContentAggregate = {
  content: string
  tags: Array<string>
  title: string
}

interface RichTextEditorProps <TPublish extends (content: ContentAggregate) => Promise<any>> {
  /**
   * @description IMPORTANT NOTICE : always use `useCallback` hook to avoid unnecessary rerenders
   */
  onInit?: ReturnsPost | null
  onInitError?: (err: any) => void
  onPublish: TPublish
  afterPublish?:(res: TPublish extends ((content: ContentAggregate) => Promise<infer T>) ? T : any) => void
  onCancel?: () => void
  enableTags?: boolean
  enableTitle?: boolean
  submitButtonText?: string
  contentPlaceholder?: string
}

/**
 * @deprecated
 */
export default function RichTextEditor <TPublish extends (content: ContentAggregate) => Promise<any>>
  ({ onPublish, afterPublish, onInit, enableTags=false, enableTitle=false, onCancel, submitButtonText="انتشار سوال", onInitError, contentPlaceholder="محتوا را وارد کنید"} : RichTextEditorProps<TPublish>)
{
  
  const [contentLoading, setContentLoading] = useState(false)
  const editor = useRichTextEditor({ placholder: contentPlaceholder })
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])

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
      .then(res => {
        afterPublish && afterPublish(res)
        editor?.chain().clearContent().run()
      })
      .catch(e => setPublishError(e))
      .finally(()=>setPublishLoading(false))
  }, [onPublish, title, tags, editor])

  return (
    <Grid sx={{ mt: 2, px: '10px'}}>
      <Card sx={{ py: 2, px: 3, borderRadius: 2}}>
        {contentLoading && <PageLoader fixed />}
        {enableTitle && <Grid container direction="row">
          <InputBase
            placeholder="عنوان سوال را وارد کنید..."
            sx={{ fontSize: 35, mb:2, flexGrow:1}}
            value={title}
            onChange={e=>setTitle(e.currentTarget.value)}
          />
        </Grid>}
        {enableTags && <TagInput {...{tags, setTags}} />}
        {(enableTitle || enableTags) && <Divider sx={{ mt: 1, mb: 3 }}/>}
        <EditorContent editor={editor} />
        <Grid container sx={{ mt: 2 }}>
          <LoadingButton variant="outlined" color="primary" sx={{ mr: 1}} onClick={publish} loading={publishLoading} disabled={!canPublish}>
            <Typography sx={{ mr: 1 }}>{submitButtonText}</Typography>
            <FontAwesomeIcon
              icon={faCheck}
            />
          </LoadingButton>
          
          <Button variant="outlined" color="error" sx={{ mr: 1}} onClick={() => { editor?.chain().clearContent().run(); onCancel && onCancel() }} disabled={onCancel? false : editor?.isEmpty}>
            <Typography sx={{ mr: 1 }}>انصراف</Typography>
            <FontAwesomeIcon
                icon={faTimes}
            />
          </Button>
          
        </Grid>
        <Grid>
          <Typography color="error">{publishError?.message}</Typography>
        </Grid>
      </Card>
    </Grid>
  )
}


