import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faCalculator, faCode, faHeading, faImage, faItalic, faLink } from '@fortawesome/free-solid-svg-icons';
import { styled } from "@nextui-org/react";
import { Editor } from "@tiptap/react";

const ToolbarUI = styled('div', {
  d: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  bg: '$gray50',
  borderRadius: '$md',
  w: '90%',
  maxW: '400px',
  position: 'fixed',
  bottom: '$5',
  left: '50%',
  transform: 'translateX(-50%)'
})

const ToolbarItemUI = styled('div', {
  d: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  px: '$5',
  py: '$5',
  h: '50px',
  transition: '$dropdownItem',
  boxSizing: 'border-box',
  border: '1px solid transparent',
  flexGrow: '1',
  '&:hover': {
    bg: '$gray200',
    cursor: 'pointer',
    border: '1px solid $primary'
  },
  '&.active': {
    bg: '$primaryLight'
  }
})

interface IEditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor } : IEditorToolbarProps) {

  const api = {
    toggleH1() {
      editor?.commands.toggleHeading({ level: 3 });
    },
    toggleH2() {
      editor?.commands.toggleHeading({ level: 4 });
    },
    toggleBold() {
      editor?.commands.toggleBold();
    },
    toggleItalic() {
      editor?.commands.toggleItalic();
    },
    toggleLink() {
      if (editor?.isActive('link')) {
        editor?.commands.unsetLink()
      }
      else {
        const textURL = prompt('لطفا لینک مورد نظر را وارد کنید');
        if (textURL)
          editor?.commands.setLink({ href:textURL, target: '_blank' });
      }
    }
  }

  return (
    <ToolbarUI>
      <ToolbarItemUI
        className={editor?.isActive('heading', { level: 3 }) ? 'active' : ''}
        onClick={()=>api.toggleH1()}
      >
        <FontAwesomeIcon icon={faHeading} /><sub>1</sub>
      </ToolbarItemUI>
      <ToolbarItemUI
        className={editor?.isActive('heading', { level: 4 }) ? 'active' : ''}
        onClick={()=>api.toggleH2()}
      >
        <FontAwesomeIcon icon={faHeading} /><sub>2</sub>
      </ToolbarItemUI>
      <ToolbarItemUI
        className={editor?.isActive('bold') ? 'active' : ''}
        onClick={()=>api.toggleBold()}
      >
        <FontAwesomeIcon icon={faBold} />
      </ToolbarItemUI>
      <ToolbarItemUI
        className={editor?.isActive('italic') ? 'active' : ''}
        onClick={()=>api.toggleBold()}
      >
        <FontAwesomeIcon icon={faItalic} />
      </ToolbarItemUI>
      <ToolbarItemUI
        className={editor?.isActive('link') ? 'active' : ''}
        onClick={()=>api.toggleLink()}
      >
        <FontAwesomeIcon icon={faLink} />
      </ToolbarItemUI>
      <ToolbarItemUI>
        <FontAwesomeIcon icon={faImage} />
      </ToolbarItemUI>
      <ToolbarItemUI>
        <FontAwesomeIcon icon={faCode} />
      </ToolbarItemUI>
      <ToolbarItemUI>
        <FontAwesomeIcon icon={faCalculator} />
      </ToolbarItemUI>
    </ToolbarUI>
  );
}