import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter, faAlignLeft, faAlignRight, faBold, faCalculator, faCode, faFile, faHeading, faImage, faItalic, faLink, faQuoteLeft, faUnderline, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Editor } from "@tiptap/react";
import { IEditorAPI } from "../../interfaces";
import EditorToolbarItem from "../ui/EditorToolbarItem";
import EditorToolbarMenu from "../ui/EditorToolbarMenu";
import EditorToolbarAction from "../ui/EditorToolbarAction";
import EditorToolbarContainer from "../ui/EditorToolbarContainer";

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
          editor?.chain().focus().setLink({ href:textURL, target: '_blank' }).run();
      }
    },
    toggleUnderline() {
      editor?.chain().focus().toggleUnderline().run();
    }
  }

  return (
    <EditorToolbarContainer>
      {/* Text Direction */}
      <EditorToolbarItem
        menu={
          <>
            <EditorToolbarAction icon={faAlignLeft} onClick={()=>null} text="چپ" />
            <EditorToolbarAction icon={faAlignCenter} onClick={()=>null} text="مرکز" />
          </>
        }
        item={<EditorToolbarAction icon={faAlignRight} onClick={()=>null} />}
      />
      {/* Heading */}
      <EditorToolbarItem
        menu={
          <>
            <EditorToolbarAction active={editor?.isActive('heading', {level: 3})} icon={faHeading} onClick={()=>{api.toggleH1()}} text="تیتر 1" />
            <EditorToolbarAction active={editor?.isActive('heading', {level: 4})} icon={faHeading} onClick={()=>{api.toggleH2()}} text="تیتر 2" />
          </>
        }
        item={<EditorToolbarAction icon={faHeading} onClick={()=>null} />}
      />
      {/* Text Style */}
      <EditorToolbarItem
        menu={
          <>
            <EditorToolbarAction active={editor?.isActive('bold')} icon={faBold} onClick={()=>{api.toggleBold()}} text="بولد" />
            <EditorToolbarAction active={editor?.isActive('italic')} icon={faItalic} onClick={()=>{api.toggleItalic()}} text="ایتالیک" />
            <EditorToolbarAction active={editor?.isActive('underline')} icon={faUnderline} onClick={()=>{api.toggleUnderline()}} text="زیرخط" />
          </>
        }
        item={<EditorToolbarAction icon={faBold} onClick={()=>null} />}
      />
      {/* Attachments */}
      <EditorToolbarItem
        menu={
          <>
            <EditorToolbarAction active={editor?.isActive('link')} icon={faLink} onClick={()=>{api.toggleLink()}} text="لینک" />
            <EditorToolbarAction icon={faImage} onClick={()=>null} text="تصویر" />
            <EditorToolbarAction icon={faFile} onClick={()=>null} text="فایل" />
          </>
        }
        item={<EditorToolbarAction icon={faLink} onClick={()=>null} />}
      />
      {/* Text Blocks */}
      <EditorToolbarItem
        menu={
          <>
            <EditorToolbarAction icon={faCode} onClick={()=>null} text="کد" />
            <EditorToolbarAction icon={faQuoteLeft} onClick={()=>null} text="نقل قول" />
          </>
        }
        item={<EditorToolbarAction icon={faCode} onClick={()=>null} />}
      />
    </EditorToolbarContainer>
  );
}