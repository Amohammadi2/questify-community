import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from "@mui/material"
import { Editor, EditorContent } from "@tiptap/react"
import ToolbarButton from "./ToolbarButton"
import { faBold, faCopy, faCut, faImage, faItalic, faLink, faPaste, faStrikethrough, faUnderline, faUpload } from "@fortawesome/free-solid-svg-icons"
import { useModal } from "@/hooks/useModal"
import { useState } from "react"
import { ImageInput } from "@/components/image-tools"
import "@/styles/ProseMirror.css"
import { useRecoilValue } from "recoil"
import { $fileUploadApi } from "@/apis"
import { LoadingButton } from "@mui/lab"

export interface ITextEditorProps {
  editor: Editor | null
}

export default function TextEditor({ editor } : ITextEditorProps) {

  // toolbar functions

  const formattingCommands = [
    { name: 'bold', icon: faBold },
    { name: 'italic', icon: faItalic },
    { name: 'underline', icon: faUnderline },
  ]

  const handleCut = async () => {
    const selectedText = window.getSelection()?.toString()
    await navigator.clipboard.writeText(selectedText||'')
    document.execCommand('cut'); // Fallback for browsers that don't support Clipboard API
  }
  
  const handleCopy = async () => {
    const selectedText = window.getSelection()?.toString()
    await navigator.clipboard.writeText(selectedText||'')
  }
  
  const handlePaste = async () => {
    const text = await navigator.clipboard.readText()
    document.execCommand('insertText', false, text)
  }

  const clipboardCommands = [
    { icon: faCopy, handler: handleCopy },
    { icon: faCut, handler: handleCut },
    { icon: faPaste, handler: handlePaste },
  ]

  // adding links
  const [openLinkModal, linkModalState] = useModal()
  const [linkText, setLinkText] = useState('')

  const handleLink = () => {
    editor?.chain().focus().toggleLink({ href: linkText }).run()
    linkModalState.onClose()
    setLinkText('')
  }

  const toggleLink = () => {
    if (editor?.isActive('link'))
      handleLink() // removes the link
    else
      openLinkModal()
  }

  const linkModal = (
    <Dialog
      open={linkModalState.open}
      onClose={linkModalState.onClose}
    >
      <DialogTitle>
        افزودن لینک
      </DialogTitle>
      <DialogContent>
        <TextField sx={{ width: '400px'}} placeholder="https://google.com" value={linkText} onChange={(e) => setLinkText(e.currentTarget.value)} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleLink}>افزودن</Button>
        <Button variant="outlined" color="error" onClick={linkModalState.onClose}>انصراف</Button>
      </DialogActions>
    </Dialog>
  )



  // uploading images
  const [openImageModal, imageModalState] = useModal()
  const [imageFile, setImageFile] = useState<File|null>(null)
  const [fileLoading, setFileLoading] = useState(false);
  const fileUploadApi = useRecoilValue($fileUploadApi)

  const handleImageUpload = async () => {
    // Add image to the editor
    const arrayBuffer = await imageFile?.arrayBuffer()
    if (arrayBuffer) {
      const blob = new Blob([new Uint8Array(arrayBuffer)], {type: imageFile?.type });
      setImageFile(null)
      // const formData = new FormData();
      // formData.append('file', blob);
      setFileLoading(true)
      const response = await fileUploadApi.fileUploadUploadCreate({
        file: blob
      })
      .finally(() => setFileLoading(false))
      editor?.chain().focus().setImage({
        src: response.fileUrl
      }).run()
      imageModalState.onClose()
    }
  }

  const handleImageUploadCancel = () => {
    imageModalState.onClose()
    setImageFile(null)
  }

  const imageModal = (
    <Dialog
      open={imageModalState.open}
      onClose={imageModalState.onClose}
    >
      <DialogTitle>
        افزودن تصویر
      </DialogTitle>
      <DialogContent>
        <ImageInput
          onUpload={f => setImageFile(f)}
          value={imageFile}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton variant="outlined" onClick={handleImageUpload} loading={fileLoading}>افزودن</LoadingButton>
        <Button variant="outlined" color="error" onClick={handleImageUploadCancel}>انصراف</Button>
      </DialogActions>
    </Dialog>
  )


  const toolbar = (
    <Card sx={{ py: .6, mb: 2}}>
      {linkModal}
      {imageModal}
      <Grid container direction="row">
        {formattingCommands.map(command => 
          <ToolbarButton
            icon={command.icon}
            isActive={editor?.isActive(command.name)}
            onClick={() => editor?.chain().focus().toggleMark(command.name).run()}
          />
        )}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        {clipboardCommands.map(command => 
          <ToolbarButton
            icon={command.icon}
            onClick={command.handler}
          />
        )}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <ToolbarButton icon={faLink} onClick={toggleLink} isActive={editor?.isActive('link')} />
        <ToolbarButton icon={faImage} onClick={()=>openImageModal()} />
      </Grid>
    </Card>
  )


  return (
    <Grid container direction="column">
      {toolbar}
      <EditorContent editor={editor} />
    </Grid>
  )
}