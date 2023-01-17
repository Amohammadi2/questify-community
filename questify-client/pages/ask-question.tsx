import { useAuthGuard } from "modules/auth/route-protector";
import { getNavLayout } from "../modules/app-navigation";
import { BackArrow } from "../modules/app-navigation";
import { AskQuestionNavContent, QuestionEditorPage } from "modules/questions";
import { NextPageWithLayout } from "../utils/next-layout";
import { useAskSchoolQuestion } from "modules/questions/school-questions/graphql/useAskSchoolQuestion";
import { useRouter } from "next/router";

const AskQuestion: NextPageWithLayout = () => {
  
  useAuthGuard();
  const router = useRouter();
  
  return (
    <QuestionEditorPage
      useAskQuestionAPI={useAskSchoolQuestion}
      onPublishCompleted={({ id }) => router.push('/question-details/?qid='+id)}
    />
  );
}

AskQuestion.getLayout = getNavLayout({
  navbarContent: (
    <>
      <BackArrow />
      <AskQuestionNavContent />
    </>
  )
});

export default AskQuestion;