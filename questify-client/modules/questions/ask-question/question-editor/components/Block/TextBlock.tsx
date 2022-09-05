import TextareaAutosize from 'react-textarea-autosize';
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { styled } from "@nextui-org/react"
import { IconButton } from "../../../../../app-ui"

const TextBlockUI = styled('div', {
  my: '$3',
  boxShadow: '$md',
  d: 'flex',
  borderRadius: '$md',
  py: '$4',
  px: '$5'
})

const BlockTextArea = styled(TextareaAutosize, {
  border: 'none',
  outline: 'none',
  resize: 'none',
  px: '$5',
  width: '100%',
})

export default function TextBlock({ content, onContentChanged }) {
  return (
    <TextBlockUI>
      <BlockTextArea
        minRows={10} 
        placeholder="نوشته را وارد کنید" 
        value={content.text} 
        onChange={e => onContentChanged(e.target.value)}
      />
    </TextBlockUI>
  )
}