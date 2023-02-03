import { useAuthGuard } from "modules/auth/route-protector";
import { getNavLayout } from "../modules/app-navigation";
import { BackArrow } from "../modules/app-navigation";
import { QuestionEditorNavContent, QuestionEditorPage } from "modules/questions";
import { NextPageWithLayout } from "../utils/next-layout";
import { useRouter } from "next/router";
import { useAskQuestion }  from 'modules/questions/question-editor';

const AskQuestion: NextPageWithLayout = () => {
  
  useAuthGuard();
  const router = useRouter();
  
  return (
    <QuestionEditorPage
      useAskQuestionAPI={()=>useAskQuestion('community', 'sdfjdf')}
      onPublishCompleted={({ id }) => router.push('/question-details/?qid='+id)}
    />
  );
}

AskQuestion.getLayout = getNavLayout({
  navbarContent: (
    <>
      <BackArrow />
      <QuestionEditorNavContent />
    </>
  )
});

export default AskQuestion;