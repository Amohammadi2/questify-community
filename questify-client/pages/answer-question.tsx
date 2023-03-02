import { BackArrow, getNavLayout } from "modules/app-navigation";
import { useAuthGuard } from "modules/auth/route-protector";
import { AnswerQuestionPage } from "modules/questions/answer-question";
import SendAnswerButton from "modules/questions/answer-question/components/SendAnswerButton";
import { NextPageWithLayout } from "utils/next-layout";

const AnswerQuestion: NextPageWithLayout = () => {
  
  useAuthGuard();
  
  return (
    <AnswerQuestionPage />
  )
}

AnswerQuestion.getLayout = getNavLayout({
  activateSidebar: false,
  navbarContent: (
    <>
    <BackArrow />
    <SendAnswerButton />
    </>
  )
})

export default AnswerQuestion;