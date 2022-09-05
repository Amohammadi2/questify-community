import { getNavLayout } from "../modules/app-navigation";
import { BackArrow } from "../modules/app-navigation/components/BackArrow";
import { AskQuestionProcess } from "../modules/questions";
import { NextPageWithLayout } from "../utils/next-layout";

const AskQuestion: NextPageWithLayout = () => {
  
  // Todo: add capabilities to determine question type from url parameters
  
  return (
    <AskQuestionProcess questionType="school" />
  );
}

AskQuestion.getLayout = getNavLayout({
  navbarContent: <BackArrow />
});

export default AskQuestion;