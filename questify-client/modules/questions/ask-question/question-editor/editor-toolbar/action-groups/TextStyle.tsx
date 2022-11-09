import EditorToolbarItem from '../ui/EditorToolbarItem';
import EditorToolbarAction from '../ui/EditorToolbarAction';
import { HasEditor } from './interfaces';
import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';

export default function TextStyle({ editor } : HasEditor) {

  const editorActions = {
    toggleBold() {
      editor?.chain().focus().toggleBold().run();
    },
    toggleItalic() {
      editor?.chain().focus().toggleItalic().run();
    },
    toggleUnderline() {
      editor?.chain().focus().toggleUnderline().run();
    }
  };

  return (
    <EditorToolbarItem
      menu={
        <>
          <EditorToolbarAction active={editor?.isActive('bold')} icon={faBold} onClick={()=>{editorActions.toggleBold()}} text="بولد" />
          <EditorToolbarAction active={editor?.isActive('italic')} icon={faItalic} onClick={()=>{editorActions.toggleItalic()}} text="ایتالیک" />
          <EditorToolbarAction active={editor?.isActive('underline')} icon={faUnderline} onClick={()=>{editorActions.toggleUnderline()}} text="زیرخط" />
        </>
      }
      item={<EditorToolbarAction icon={faBold} onClick={()=>null} />}
    />
  );
}