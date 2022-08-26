import { getNavLayout } from "../modules/app-navigation/layouts/NavLayout";
import { useRequireAuthentication } from "../modules/auth/route-protector";
import { NextPageWithLayout } from "../utils/next-layout";

const SchoolQuestion: NextPageWithLayout = ( ) => {
  useRequireAuthentication();
  
  return <h1>اینجا لیست سوالات پرسیده شده در مدرسه را خواهید دید</h1>
}

SchoolQuestion.getLayout = getNavLayout({ activateSidebar: true });

export default SchoolQuestion;