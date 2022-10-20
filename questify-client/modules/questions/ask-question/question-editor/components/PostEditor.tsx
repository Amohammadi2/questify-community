import { Grid, styled, Text, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { canPublish } from "../validators/can-publish.validator";
import TextBlock from "./Block/TextBlock";
import { IQuestionInput } from "../../../entities";
import ActionButton from "./ActionButton";
import PreviewModal  from "./PreviewModal";
import { useSaveDraft } from "../../hooks/useSaveDraft";
import { APIStats } from "@utils/api-stats.interface";
import PublishModal from "./PublishModal";
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

interface IPostEditorProps {
  onPublish: (content: IQuestionInput) => void;
  publishStats: APIStats;
  onDraftSave: (content: IQuestionInput) => void;
  draftStats: APIStats;
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

const PostEditorContainer = styled('div', {
  w: '100%',
  maxW: '900px',
  borderRadius: '$md',
  border: '1px solid $gray400',
  px: '$5',
  py: '$4'
})

export default function PostEditor({ onPublish, publishStats, onDraftSave, draftStats }: IPostEditorProps) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [APIError, setAPIError] = useState<string | null>(null);
  const { allChecksPass, contentAvailable, errorMessage } = canPublish(title, content);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [3,4]
        }
      }),
      Placeholder.configure({
        placeholder: 'سوال خود را وارد کنید...'
      }) // Fix::ref: https://tiptap.dev/api/extensions/placeholder#source-code
    ]
  })

  // track error status
  useEffect(() => {setAPIError(publishStats.error || null)}, [publishStats.error]);
  useEffect(() => {setAPIError(draftStats.error || null)}, [draftStats.error]);
  useEffect(() => {setAPIError(null)}, [errorMessage]);

  // format and publish the content
  const handlePublish = (_tags: string[]) => {
    setAPIError('');
    onPublish({ title, content, tags: _tags })
  }
  const handleDraftSave = () => {
    setAPIError('');
    onDraftSave({ title, content, tags: []});
  }

  return (
    <PostEditorContainer>

      <EditorContent editor={editor}  />

      {/* <PreviewModal 
        previewOpen={previewOpen}
        setPreviewOpen={setPreviewOpen}
        title={title}
        content={content}
      />

      <PublishModal
        open={publishModalOpen}
        onClose={()=>setPublishModalOpen(false)}
        onPublish={(_tags) => handlePublish(_tags)}
        publishLoading={publishStats.loading}
      />

      <TitleInput placeholder="عنوان سوال را وارد کنید" onChange={e => setTitle(e.target.value)} />
      <TextBlock
        content={content}
        onContentChanged={(content) => setContent(content)}
      />

      <ActionButtonContainer>
        <ActionButton
          size="sm"
          disabled={(!(allChecksPass) || publishStats.loading) || publishModalOpen}
          onPress={() => setPublishModalOpen(true)}
        >
          انتشار
        </ActionButton>
        <ActionButton size="sm" color="secondary" disabled={!(contentAvailable)} onClick={() => setPreviewOpen(true)}>پیش‌نمایش</ActionButton>
        <ActionButton
          size="sm"
          flat
          disabled={!(contentAvailable) || draftStats.loading}
          onClick={()=>handleDraftSave()}
        >
          {draftStats.loading ? <Loading size="sm" /> : "ذخیره پیش‌نویس"}
        </ActionButton>
        {(contentAvailable) && (
          <Text color="$red600" css={{ mx: '$2' }}>{errorMessage}</Text>
        )}
        {APIError && errorMessage ? '|':''}
        <Text color="$red600" css={{ mx: '$2' }}>{APIError}</Text>
      </ActionButtonContainer> */}
  
    </PostEditorContainer>
  );

}