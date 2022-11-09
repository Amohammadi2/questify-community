import EditorToolbarItem from '../ui/EditorToolbarItem';
import EditorToolbarAction from '../ui/EditorToolbarAction';
import { faImage, faFile, faLink } from '@fortawesome/free-solid-svg-icons';
import { HasEditor } from './interfaces';

export default function Attachments({ editor } : HasEditor) {
  
  const editorActions = {
    toggleLink() {
      if (editor?.isActive('link')) {
        editor?.chain().focus().unsetLink().run();
      }
      else {
        const textURL = prompt('لطفا لینک مورد نظر را وارد کنید');
        if (textURL)
          editor?.chain().focus().setLink({ href:textURL, target: '_blank' }).run();
      }
    }
  };
  
  return (
    <EditorToolbarItem
      menu={
        <>
          <EditorToolbarAction active={editor?.isActive('link')} icon={faLink} onClick={()=>{editorActions.toggleLink()}} text="لینک" />
          <EditorToolbarAction icon={faImage} onClick={()=>null} text="تصویر" />
          <EditorToolbarAction icon={faFile} onClick={()=>null} text="فایل" />
        </>
      }
      item={<EditorToolbarAction icon={faLink} onClick={()=>null} />}
    />
  );
}