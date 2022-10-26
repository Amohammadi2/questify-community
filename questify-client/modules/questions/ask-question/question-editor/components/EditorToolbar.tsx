import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignRight, faBold, faCalculator, faCode, faHeading, faImage, faItalic, faLink, faUpload } from '@fortawesome/free-solid-svg-icons';
import { styled } from "@nextui-org/react";
import { Editor } from "@tiptap/react";
import { IEditorAPI } from "../interfaces";
import EditorToolbarItem from "./EditorToolbarItem";

const ToolbarUI = styled('div', {
  d: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  bg: '$white',
  borderTopRightRadius: '5px',
  borderTopLeftRadius: '5px',
  border: '1px solid $gray400',
  w: '90%',
  maxW: '400px',
  position: 'fixed',
  bottom: '0',
  left: '50%',
  transform: 'translateX(-50%)'
})

interface IEditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor } : IEditorToolbarProps) {

  const api: IEditorAPI = {
    toggleH1() {
      editor?.chain().focus().toggleHeading({ level: 3 }).run();
    },
    toggleH2() {
      editor?.chain().focus().toggleHeading({ level: 4 }).run();
    },
    toggleBold() {
      editor?.chain().focus().toggleBold().run();
    },
    toggleItalic() {
      editor?.chain().focus().toggleItalic().run();
    },
    toggleLink() {
      if (editor?.isActive('link')) {
        editor?.chain().focus().unsetLink().run();
      }
      else {
        const textURL = prompt('لطفا لینک مورد نظر را وارد کنید');
        if (textURL)
          editor?.chain().focus().setLink({ href:textURL, target: '_blank' });
      }
    }
  }

  return (
    <ToolbarUI>
      <EditorToolbarItem icon={faAlignRight} />
      <EditorToolbarItem icon={faHeading} />
      <EditorToolbarItem icon={faBold} />
      <EditorToolbarItem icon={faUpload} />
      <EditorToolbarItem icon={faCode} />
    </ToolbarUI>
  );
}