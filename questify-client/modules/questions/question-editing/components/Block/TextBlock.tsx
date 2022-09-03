import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { styled } from "@nextui-org/react"
import { IconButton } from "../../../../app-ui"

const TextBlockUI = styled('div', {
  my: '$3',
  boxShadow: '$md',
  d: 'flex',
  borderRadius: '$md',
  py: '$4',
  px: '$5'
})

const BlockTextArea = styled('textarea', {
  border: 'none',
  outline: 'none',
  resize: 'none',
  px: '$5',
  width: '100%',
  height: '200px',
})

export default function TextBlock({ content, onUpdate, onRemove }) {
  return (
    <TextBlockUI>
      <div>
        <IconButton onClick={()=>onRemove()}>
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
      </div>
      <BlockTextArea 
        placeholder="نوشته را وارد کنید" 
        value={content.text} 
        onChange={e => onUpdate({ text: e.target.value })}
      ></BlockTextArea>
    </TextBlockUI>
  )
}