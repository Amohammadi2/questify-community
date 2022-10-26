import { Grid, styled, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { canPublish } from "../validators/can-publish.validator";
import { IQuestionInput } from "../../../entities";
import { APIStats } from "@utils/api-stats.interface";
import PublishModal from "./PublishModal";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { canBePublishedAtom, isPublishModalOpenAtom } from "../states";
import EditorToolbar from "./EditorToolbar";

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
  py: '$4',
  my: '$5',
})

export default function PostEditor({ onPublish, publishStats, onDraftSave, draftStats }: IPostEditorProps) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [APIError, setAPIError] = useState<string | null>(null);
  const [,setCanBePublished] = useRecoilState(canBePublishedAtom);
  const [isPublishModalOpen, setIsPublishModalOpen] = useRecoilState(isPublishModalOpenAtom);
  const { allChecksPass, errorMessage, nOfWords } = canPublish(content);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [3,4]
        }
      }),
      Placeholder.configure({
        placeholder: 'سوال خود را وارد کنید...'
      }),
      Link.configure({
        linkOnPaste: true
      })
    ]
  })

  // update the content
  useEffect(() => {
    setContent(editor?.getHTML() || '');
  }, [editor?.getText()])

  // validate the content and inform the navbar publish button
  useEffect(() => {
    setCanBePublished(allChecksPass);
  }, [allChecksPass]);

  // track error status
  useEffect(() => {setAPIError(publishStats.error || null)}, [publishStats.error]);
  useEffect(() => {setAPIError(draftStats.error || null)}, [draftStats.error]);
  useEffect(() => {setAPIError(null)}, [errorMessage]);

  // close the publish modal after the api call data has been received
  useEffect(()=>{
    if (publishStats.data) {
      setIsPublishModalOpen(false);
    }
  }, [publishStats.data]);

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
    <>
      <PublishModal
        open={isPublishModalOpen}
        onClose={()=>setIsPublishModalOpen(false)}
        onPublish={(_tags) => handlePublish(_tags)}
        publishLoading={publishStats.loading}
      />
      <PostEditorContainer>

        <EditorContent editor={editor}  />
    
        {editor?.getText() != ''
          ? <Grid.Container direction="row">
              <Text color="$red500">{errorMessage}</Text>
              <Text css={{ mx: '$3' }}>/</Text>
              <Text color="$gray600">{nOfWords} کلمه</Text>
            </Grid.Container>
          : <></>}

      </PostEditorContainer>
      <EditorToolbar editor={editor} />
    </>
  );

}