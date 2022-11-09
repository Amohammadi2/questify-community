import { faAlignLeft, faAlignRight, faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import EditorToolbarItem from '../ui/EditorToolbarItem';
import EditorToolbarAction from '../ui/EditorToolbarAction';
import { HasEditor } from './interfaces';


export default function TextDirection({ editor } : HasEditor) {

  window.editor = editor;
  
  const getActiveIcon = () => {
    return editor?.isActive({ textDirection: 'rtl' })  ? faAlignRight : faAlignLeft;
  }

  const isActive = direction => {
    return editor?.isActive({ textDirection: direction });
  }

  const editorCommands = {
    setDirection(direction: string) {
      editor?.chain().focus().setTextDirection(direction).run();
    }
  }
  
  return (
    <EditorToolbarItem
      menu={
        <>
          <EditorToolbarAction
            active={isActive('ltr')}
            icon={faAlignLeft}
            onClick={()=>editorCommands.setDirection('ltr')}
            text="چ.ب.ر" 
          />
          <EditorToolbarAction
            active={isActive('rtl')}
            icon={faAlignRight}
            onClick={()=>editorCommands.setDirection('rtl')}
            text="ر.ب.چ"
          />
        </>
      }
      item={
        <EditorToolbarAction
          icon={getActiveIcon()}
          onClick={()=>null} 
        />
      }
    />
  )
}