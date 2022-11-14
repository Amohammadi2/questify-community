import { useAuthGuard } from "modules/auth/route-protector";
import { getNavLayout } from "../modules/app-navigation";
import { BackArrow } from "../modules/app-navigation";
import { AskQuestionNavContent, QuestionEditorPage } from "modules/questions";
import { NextPageWithLayout } from "../utils/next-layout";
import { useAskSchoolQuestion } from "modules/questions/school-questions/graphql/useAskSchoolQuestion";

const AskQuestion: NextPageWithLayout = () => {
  
  useAuthGuard();
  
  return (
    <QuestionEditorPage
      useAskQuestionAPI={useAskSchoolQuestion}
    />
  );
}

AskQuestion.getLayout = getNavLayout({
  navbarContent: (
    <>
      <AskQuestionNavContent />
      <BackArrow />
    </>
  )
});

export default AskQuestion;