import { faHeading } from '@fortawesome/free-solid-svg-icons';
import { EditorToolbarItem, EditorToolbarAction } from '../toolbar-ui';
import { HasEditor } from '../../interfaces';


export default function Heading({ editor } : HasEditor) {

  const editorActions = {
    toggleH1() {
      editor?.chain().focus().toggleHeading({ level: 3 }).run();
    },
    toggleH2() {
      editor?.chain().focus().toggleHeading({ level: 4 }).run();
    }
  };

  return (
    <EditorToolbarItem
      menu={
        <>
          <EditorToolbarAction active={editor?.isActive('heading', {level: 3})} icon={faHeading} onClick={()=>{editorActions.toggleH1()}} text="تیتر 1" />
          <EditorToolbarAction active={editor?.isActive('heading', {level: 4})} icon={faHeading} onClick={()=>{editorActions.toggleH2()}} text="تیتر 2" />
        </>
      }
      item={<EditorToolbarAction icon={faHeading} onClick={()=>null} />}
    />
  );
}