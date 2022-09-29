import { getNavLayout } from "modules/app-navigation";
import { useRequireAuthentication } from "modules/auth/route-protector";
import { MyQuestionsList } from "modules/questions";
import { NextPageWithLayout } from "utils/next-layout";

const MyQuestionsPage: NextPageWithLayout = () => {
  useRequireAuthentication();

  return (
    <MyQuestionsList />
  )
}

MyQuestionsPage.getLayout = getNavLayout({
  activateSidebar: true
});

export default MyQuestionsPage;