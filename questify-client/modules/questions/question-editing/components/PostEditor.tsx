import { Grid, Input, styled } from "@nextui-org/react";
import { useEditorBlocks } from "../hooks/useEditorBlocks";
import TextBlock from "./Block/TextBlock";
import BlockTypeSelector from "./BlockTypeSelector";
import QuestionSectionMap from "./QuestionSectionMap";

interface IPostEditorProps {
  onContentEdited: (content: any) => void
}

const TitleInput = styled('input', {
  height: '3.5rem',
  fontSize: '$xl2',
  outline: 'none',
  border: 'none',
  textAlign: 'center',
  mb: '$10'
})



export default function PostEditor({ onContentEdited } : IPostEditorProps) {
  
  const { blocks, addBlock, removeBlock, updateBlock } = useEditorBlocks();
  
  const handleBlockSelected = (blockType: "text" | "file") => {
    if (blockType == "text")
      addBlock({ type: "text", content: { text: '' } });
  }

  return (
    <Grid.Container css={{ py: '$5', px: '$10', height: '100%' }} direction="row">
      <Grid.Container direction="column" xs={9}>
        <TitleInput placeholder="عنوان سوال را وارد کنید" />
          {/* Warning: This part of code is very inefficient */}
          {blocks.map(b => (
            <TextBlock
              key={b.id}
              content={b.content}
              onRemove={()=>removeBlock(b.id)}
              onUpdate={(content)=>updateBlock(b.id, content)}
            />
          ))}

        <BlockTypeSelector onBlockSelected={handleBlockSelected} />
      </Grid.Container>
      <Grid xs={3}>
        <QuestionSectionMap editorContent={''} />
      </Grid>
    </Grid.Container>
  );
}