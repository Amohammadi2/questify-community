import { Grid, Input, styled } from "@nextui-org/react";
import CellTypeSelector from "./CellTypeSelector";
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
  return (
    <Grid.Container css={{ py: '$5', px: '$15', height: '100%' }} direction="row">
      <Grid.Container direction="column" xs={9}>
        <TitleInput placeholder="عنوان سوال را وارد کنید" />
        <CellTypeSelector onCellSelected={console.log} />
      </Grid.Container>
      <Grid xs={3}>
        <QuestionSectionMap editorContent={''} />
      </Grid>
    </Grid.Container>
  );
}