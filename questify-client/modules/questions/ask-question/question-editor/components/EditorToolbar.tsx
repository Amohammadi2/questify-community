import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter, faAlignLeft, faAlignRight, faBold, faCalculator, faCode, faFile, faHeading, faImage, faItalic, faLink, faQuoteLeft, faUnderline, faUpload } from '@fortawesome/free-solid-svg-icons';
import { styled } from "@nextui-org/react";
import { Editor } from "@tiptap/react";
import { IEditorAPI } from "../interfaces";
import EditorToolbarItem from "./EditorToolbarItem";
import EditorToolbarMenu from "./EditorToolbarMenu";
import EditorToolbarAction from "./EditorToolbarAction";

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
    },
    toggleUnderline() {
      editor?.chain().focus();
    }
  }

  return (
    <ToolbarUI>
      <EditorToolbarItem
        menu={({ toggleMenu }) => 
          <>
            <EditorToolbarAction icon={faAlignLeft} onClick={()=>{toggleMenu();}} text="چپ" />
            <EditorToolbarAction icon={faAlignCenter} onClick={()=>{toggleMenu();}} text="مرکز" />
          </>
        }
        item={({ toggleMenu })=><EditorToolbarAction icon={faAlignRight} onClick={()=>{toggleMenu();}} />}
      />
      {/* heading, bold, upload, code*/}
      <EditorToolbarItem
        menu={({ toggleMenu }) => 
          <>
            <EditorToolbarAction active={editor?.isActive('heading', {level: 3}) ? true : false} icon={faHeading} onClick={()=>{toggleMenu();api.toggleH1()}} text="تیتر 1" />
            <EditorToolbarAction active={editor?.isActive('heading', {level: 4})} icon={faHeading} onClick={()=>{toggleMenu();api.toggleH2()}} text="تیتر 2" />
          </>
        }
        item={({ toggleMenu })=><EditorToolbarAction icon={faHeading} onClick={()=>{toggleMenu();}} />}
      />
      <EditorToolbarItem
        menu={({ toggleMenu }) => 
          <>
            <EditorToolbarAction active={editor?.isActive('bold')} icon={faBold} onClick={()=>{toggleMenu();api.toggleBold()}} text="بولد" />
            <EditorToolbarAction active={editor?.isActive('italic')} icon={faItalic} onClick={()=>{toggleMenu();api.toggleItalic()}} text="ایتالیک" />
            <EditorToolbarAction icon={faUnderline} onClick={()=>{toggleMenu();}} text="زیرخط" />
          </>
        }
        item={({ toggleMenu })=><EditorToolbarAction icon={faBold} onClick={()=>{toggleMenu();}} />}
      />
      <EditorToolbarItem
        menu={({ toggleMenu }) =>
          <>
            <EditorToolbarAction icon={faLink} onClick={()=>{toggleMenu();}} text="لینک" />
            <EditorToolbarAction icon={faImage} onClick={()=>{toggleMenu();}} text="تصویر" />
            <EditorToolbarAction icon={faFile} onClick={()=>{toggleMenu();}} text="فایل" />
          </>
        }
        item={({ toggleMenu })=><EditorToolbarAction icon={faLink} onClick={()=>{toggleMenu();}} />}
      />
      <EditorToolbarItem
        menu={({ toggleMenu }) =>
          <>
            <EditorToolbarAction icon={faCode} onClick={()=>{toggleMenu();}} text="کد" />
            <EditorToolbarAction icon={faQuoteLeft} onClick={()=>{toggleMenu();}} text="نقل قول" />
          </>
        }
        item={({ toggleMenu })=><EditorToolbarAction icon={faCode} onClick={()=>{toggleMenu();}} />}
      />
    </ToolbarUI>
  );
}