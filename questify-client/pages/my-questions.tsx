import { getNavLayout } from "modules/app-navigation";
import { useAuthGuard } from "modules/auth/route-protector";
import { QuestionList } from "modules/questions/user-question-list/components/QuestionList";
import { NextPageWithLayout } from "utils/next-layout";

const MyQuestionsPage: NextPageWithLayout = () => {
  useAuthGuard();

  return (
    <QuestionList type="asked" />
  )
}

MyQuestionsPage.getLayout = getNavLayout({
  activateSidebar: true
});

export default MyQuestionsPage;