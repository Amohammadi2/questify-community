import { Grid } from "@nextui-org/react";
import { EditorInput, isPublishModalOpenAtom } from "../editor-input";
import { useSaveDraft } from "../graphql/useSaveDraft";
import { useAskSchoolQuestion } from "modules/questions/school-questions/graphql/useAskSchoolQuestion";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TextDirection } from '../tiptap-extensions';
import { EditorCommandsToolbar } from "../editor-commands";
import { APIStats, Entity } from "@utils/api-utils";
import { IQuestionInput } from "modules/questions/entities";
import PublishModal from "./PublishModal";
import { useRecoilState } from "recoil";

interface IQuestionEditorPageOpts {
  useAskQuestionAPI: () => readonly [(input: IQuestionInput)=>void, APIStats<Entity>];
}


export default function QuestionEditorPage({ useAskQuestionAPI }: IQuestionEditorPageOpts) {

  const [saveDraft, draftStats] = useSaveDraft();
  const [askQuestion, questionStats] = useAskQuestionAPI();
  const [isPublishModalOpen,setPublishModalOpen] = useRecoilState(isPublishModalOpenAtom);

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
      }),
      Underline,
      TextDirection,
      Image.configure({
        inline: true
      })
    ]
  })

  useEffect(() => {
    if (questionStats.data) {
      setPublishModalOpen(false); // close the modal after the question has been published
    }
  }, [questionStats.loading])

  return (
    <>
      <PublishModal
        open={isPublishModalOpen}
        onClose={()=>setPublishModalOpen(false)}
        publishLoading={questionStats.loading}
        onPublish={(tags) => {
          // compose the tags with the main content
          askQuestion({
            content: editor?.getHTML() || '',
            tags
          })
        }}
      />
      <Grid.Container css={{ py: '$5', px: '$10', height: '100%' }} direction="column" alignContent="center" >
        <EditorInput
          editor={editor}
        />
        <EditorCommandsToolbar editor={editor} />
      </Grid.Container>
    </>
  )
}