import { useCallback } from 'react';
import EditorToolbarItem from '../../toolbar-ui/components/EditorToolbarItem';
import EditorToolbarAction from '../../toolbar-ui/components/EditorToolbarAction';
import { faImage, faFile, faLink } from '@fortawesome/free-solid-svg-icons';
import { HasEditor } from '../../../interfaces';
import ImageUploadModal from './ImageUploadModal';
import { emitter } from '../../events';
import { useEvent } from '@utils/events/event-emitter';

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
    },
    requestImageUpload() {
      emitter.publish<void>('open-image-upload-modal', null);
    },
    requestFileUpload() {
      emitter.publish<void>('open-file-upload-modal', null);
    }
  };

  const handleInsertImage = useCallback(({ link, title }) => {
    editor.chain()
    .focus()
    .setImage({
      src: link,
      alt: title,
      title: title
    })
    .createParagraphNear()
    .run();
  }, [editor])

  useEvent(emitter, 'insert-image', handleInsertImage);
  
  return (
    <>
      <ImageUploadModal />
      <EditorToolbarItem
        menu={
          <>
            <EditorToolbarAction active={editor?.isActive('link')} icon={faLink} onClick={()=>{editorActions.toggleLink()}} text="لینک" />
            <EditorToolbarAction icon={faImage} onClick={()=>editorActions.requestImageUpload()} text="تصویر" />
            {/* <EditorToolbarAction icon={faFile} onClick={()=>null} text="فایل" /> */}
          </>
        }
        item={<EditorToolbarAction icon={faLink} onClick={()=>null} />}
      />
    </>
  );
}