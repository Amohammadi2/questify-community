import { Grid } from "@nextui-org/react";
import { APIStats } from "@utils/api-stats.interface";
import { IQuestionInput } from "../../entities";
import { PostEditor } from "../question-editor";
import { useSaveDraft } from "../hooks/useSaveDraft";
import QuestionDrafts from './QuestionDrafts';
import { useAskSchoolQuestion } from "modules/questions/school-questions/graphql/useAskSchoolQuestion";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IQuestionProcess {
  questionType: 'school' | 'shared' | 'community';
}


export default function AskQuestionProcess({ questionType }: IQuestionProcess) {

  const router = useRouter();
  const [saveDraft, draftStats] = useSaveDraft();
  const [askQuestion, questionStats] = useAskSchoolQuestion();

  useEffect(() => {
    if (questionStats.data)
      // :ref:(1)
      router.push('/question-details?qid=' + questionStats.data.id);
  }, [questionStats.data]);

  let finalQuestionAPI: {
    onPublish: (content: IQuestionInput) => void;
    publishStats: APIStats
  } | null = null;

  switch (questionType) {
    default: // Todo: We'll add other types of question handling strategies later on
      finalQuestionAPI = {
        onPublish: (content) => askQuestion(content),
        publishStats: questionStats
      };
      break;
  }

  return (
    <Grid.Container css={{ py: '$5', px: '$10', height: '100%' }} direction="row">
      <Grid.Container css={{ pb: '$5' }} direction="column" xs={12} sm={8} md={9}>
        <PostEditor
          {...finalQuestionAPI}
          onDraftSave={(content) => saveDraft(content)}
          draftStats={draftStats}
        />
      </Grid.Container>
      <Grid xs={0} sm={4} md={3}>
        <QuestionDrafts editorContent={''} />
      </Grid>
    </Grid.Container>
  )
}