import { Grid, styled, Text } from "@nextui-org/react";
import { KeyboardEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from 'recoil';
import { canPublish } from "../validators/can-publish.validator";
import { EditorContent } from '@tiptap/react';
import { canBePublishedAtom } from "../../states";
import { HasEditor } from "../../interfaces";
import { FlexColumn } from "modules/app-ui";


const PostEditorContainer = styled('div', {
  w: '100%',
  maxW: '900px',
  borderRadius: '$md',
  border: '1px solid $gray400',
  px: '$5',
  py: '$4',
  my: '$5',
  mb: '50px'
})

export default function PostEditor({ editor }: HasEditor) {

  const [content, setContent] = useState('');
  const [,setCanBePublished] = useRecoilState(canBePublishedAtom);
  const { allChecksPass, errorMessage, nOfWords } = canPublish(content);
  const containerRef = useRef<HTMLDivElement>()

  // update the content
  useEffect(() => {
    setContent(editor?.getHTML() || '');
  }, [editor?.getText()])

  // validate the content and inform the navbar publish button
  useEffect(() => {
    setCanBePublished(allChecksPass);
  }, [allChecksPass]);

  const scrollOnEnter: KeyboardEventHandler<HTMLDivElement> = useCallback((e) => {
    containerRef.current?.scrollIntoView();
  }, [containerRef])

  return (
    <>
      <PostEditorContainer onKeyDown={scrollOnEnter} >
        <EditorContent editor={editor}  />
        {editor?.getText() != ''
          ? <Grid.Container direction="row">
              <Text color="$red500">{errorMessage}</Text>
              <Text css={{ mx: '$3' }}>/</Text>
              <Text color="$gray600">{nOfWords} کلمه</Text>
            </Grid.Container>
          : <></>}
        <div ref={containerRef} />
      </PostEditorContainer>
    </>
  );

}