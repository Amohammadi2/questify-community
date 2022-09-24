import { getNavLayout } from "modules/app-navigation"
import QuestionListLayout from "modules/questions/question-listing/QuestionListLayout"
import { MyQuestionsList } from "modules/questions/user-questions/components/MyQuestionsList"
import { NextPageWithLayout } from "utils/next-layout"

const MyQuestionsPage: NextPageWithLayout = () => {
  return (
    <MyQuestionsList />
  )
}

MyQuestionsPage.getLayout = getNavLayout({
  activateSidebar: true
});

export default MyQuestionsPage;