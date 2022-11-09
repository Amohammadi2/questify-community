import { faAlignLeft, faAlignRight, faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import EditorToolbarItem from '../ui/EditorToolbarItem';
import EditorToolbarAction from '../ui/EditorToolbarAction';
import { HasEditor } from './interfaces';


export default function TextDirection({ editor } : HasEditor) {
  return (
    <EditorToolbarItem
      menu={
        <>
          <EditorToolbarAction icon={faAlignLeft} onClick={()=>null} text="چپ" />
          <EditorToolbarAction icon={faAlignCenter} onClick={()=>null} text="مرکز" />
        </>
      }
      item={<EditorToolbarAction icon={faAlignRight} onClick={()=>null} />}
    />
  )
}