import { useRequireAuthentication } from "modules/auth/route-protector";
import { getNavLayout } from "../modules/app-navigation";
import { BackArrow } from "../modules/app-navigation";
import { AskQuestionNavContent, AskQuestionProcess } from "modules/questions";
import { NextPageWithLayout } from "../utils/next-layout";

const AskQuestion: NextPageWithLayout = () => {
  
  useRequireAuthentication();
  // Todo: add capabilities to determine question type from url parameters
  
  return (
    <AskQuestionProcess questionType="school" />
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