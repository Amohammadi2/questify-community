import { Grid, styled, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { canPublish } from "../validators/can-publish.validator";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TextDirection } from '../../tiptap-extensions';
import { canBePublishedAtom } from "../../states";
import { HasEditor } from "../../interfaces";


const PostEditorContainer = styled('div', {
  w: '100%',
  maxW: '900px',
  borderRadius: '$md',
  border: '1px solid $gray400',
  px: '$5',
  py: '$4',
  my: '$5',
})

export default function PostEditor({ editor }: HasEditor) {

  const [content, setContent] = useState('');
  const [,setCanBePublished] = useRecoilState(canBePublishedAtom);
  const { allChecksPass, errorMessage, nOfWords } = canPublish(content);

  // update the content
  useEffect(() => {
    setContent(editor?.getHTML() || '');
  }, [editor?.getText()])

  // validate the content and inform the navbar publish button
  useEffect(() => {
    setCanBePublished(allChecksPass);
  }, [allChecksPass]);

  return (
    <>
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
    </>
  );

}