import { Grid, Input, styled, Button, Text} from "@nextui-org/react";
import { useState } from "react";
import { useEditorBlocks } from "../hooks/useEditorBlocks";
import { canPublish } from "../validators/can-publish.validator";
import TextBlock from "./Block/TextBlock";
import BlockTypeSelector from "./BlockTypeSelector";
import QuestionSectionMap from "./QuestionSectionMap";

interface IPostEditorProps {
  onContentEdited: (content: {
    title: string,
    content: string
  }) => void
}

const TitleInput = styled('input', {
  height: '3.5rem',
  fontSize: '$xl2',
  outline: 'none',
  border: 'none',
  textAlign: 'center',
  mb: '$10'
})

const ActionButtonContainer = styled(Grid.Container, {
  flexDirection: 'column',
  alignItems: 'center',
  mx: '$4',
  '@xs': {
    flexDirection: 'row'
  }
})

const ActionButton = styled(Button, {
  width: '100%',
  my: '$2',
  '@xs': {
    width: 'auto',
  }
})


export default function PostEditor({ onContentEdited } : IPostEditorProps) {
  
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { allChecksPass, contentAvailable, errorMessage, minLengthChecked, nOfWords } = canPublish(title, content);

  return (
    <Grid.Container css={{ py: '$5', px: '$10', height: '100%' }} direction="row">
      <Grid.Container direction="column" xs={12} sm={8} md={9}>
        <TitleInput placeholder="عنوان سوال را وارد کنید" onChange={e=>setTitle(e.target.value)} />
        <TextBlock
          content={content}
          onContentChanged={(content)=>setContent(content)}
        />
        <ActionButtonContainer>
          <ActionButton size="sm" css={{ mx: '$2' }} disabled={!(allChecksPass)}>انتشار</ActionButton>
          <ActionButton size="sm" color="secondary" css={{ mx: '$2' }} disabled={!(allChecksPass)}>پیش‌نمایش</ActionButton>
          <ActionButton size="sm" flat css={{ mx: '$2' }} disabled={!(allChecksPass)}>ذخیره پیش‌نویس</ActionButton>
          
          {(contentAvailable && !allChecksPass) ? (
            <Text color="$red600" css={{ mx: '$2' }}>{errorMessage}</Text>
          ) : (
            (allChecksPass) && <Text color="$green600" css={{ mx: '$2' }}>حله، فقط می خواهیم جلوی چت های کوتاه رو بگیریم</Text>
          )}

        </ActionButtonContainer>
      </Grid.Container>
      <Grid xs={0} sm={4} md={3}>
        <QuestionSectionMap editorContent={''} />
      </Grid>
    </Grid.Container>
  );
}