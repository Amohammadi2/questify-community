import { useState } from 'react';
import EditorToolbarItem from '../../toolbar-ui/components/EditorToolbarItem';
import EditorToolbarAction from '../../toolbar-ui/components/EditorToolbarAction';
import { faImage, faFile, faLink } from '@fortawesome/free-solid-svg-icons';
import { HasEditor } from '../../../interfaces';
import UploadImageModal from './UploadImageModal';

export default function Attachments({ editor } : HasEditor) {
  
  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);

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
    },
    insertImage() {
      setIsImageUploadModalOpen(true);
    }
  };
  
  return (
    <>
      <UploadImageModal
        open={isImageUploadModalOpen}
        onClose={()=>setIsImageUploadModalOpen(false)}
        onImageSelected={()=>null}
      />
      <EditorToolbarItem
        menu={
          <>
            <EditorToolbarAction active={editor?.isActive('link')} icon={faLink} onClick={()=>{editorActions.toggleLink()}} text="لینک" />
            <EditorToolbarAction icon={faImage} onClick={()=>editorActions.insertImage()} text="تصویر" />
            <EditorToolbarAction icon={faFile} onClick={()=>null} text="فایل" />
          </>
        }
        item={<EditorToolbarAction icon={faLink} onClick={()=>null} />}
      />
    </>
  );
}