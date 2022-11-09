import { Editor } from "@tiptap/react";
import EditorToolbarContainer from "../ui/EditorToolbarContainer";
import { Attachments, Heading, TextBlocks, TextDirection, TextStyle } from "../action-groups";


interface IEditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor } : IEditorToolbarProps) {

  return (
    <EditorToolbarContainer>
      <TextDirection editor={editor} />
      <Heading editor={editor} />
      <TextStyle editor={editor} />
      <Attachments editor={editor} />
      <TextBlocks editor={editor} />
    </EditorToolbarContainer>
  );
}