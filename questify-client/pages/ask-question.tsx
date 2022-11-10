import { useAuthGuard } from "modules/auth/route-protector";
import { getNavLayout } from "../modules/app-navigation";
import { BackArrow } from "../modules/app-navigation";
import { AskQuestionNavContent, AskQuestionPage } from "modules/questions";
import { NextPageWithLayout } from "../utils/next-layout";

const AskQuestion: NextPageWithLayout = () => {
  
  useAuthGuard();
  // Todo: add capabilities to determine question type from url parameters
  
  return (
    <AskQuestionPage questionType="school" />
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