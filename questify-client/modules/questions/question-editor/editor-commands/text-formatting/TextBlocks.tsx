import { EditorToolbarItem, EditorToolbarAction } from '../toolbar-ui';
import { faCode, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { HasEditor } from '../../interfaces';

export default function TextBlocks({ editor } : HasEditor) {
  
  const editorActions = {};

  return (
    <EditorToolbarItem
      menu={
        <>
          <EditorToolbarAction icon={faCode} onClick={()=>null} text="کد" />
          <EditorToolbarAction icon={faQuoteLeft} onClick={()=>null} text="نقل قول" />
        </>
      }
      item={<EditorToolbarAction icon={faCode} onClick={()=>null} />}
    />
  );
}