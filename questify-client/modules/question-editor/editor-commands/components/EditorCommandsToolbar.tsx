import { HasEditor } from "../../interfaces";
import { EditorToolbarContainer } from "../toolbar-ui";
import { Heading, TextBlocks, TextDirection, TextStyle } from '../text-formatting'
import { Attachments } from '../attachments';

export default function EditorCommandsToolbar({ editor } : HasEditor) {
  return (
    <EditorToolbarContainer>
      <TextDirection editor={editor} />
      <Heading editor={editor} />
      <TextStyle editor={editor} />
      <TextBlocks editor={editor} />
      <Attachments editor={editor} />
    </EditorToolbarContainer>
  );
}