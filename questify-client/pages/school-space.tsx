import type { NextPage } from "next";
import { AppSidebar, PrimaryNavbar } from "../modules/app-navigation";
import { getAppLayout } from "../modules/app-ui/layouts/AppLayout";
import { NextPageWithLayout } from "../utils/next-layout";

const SchoolQuestion: NextPageWithLayout = ( ) => {
  return <h1>اینجا لیست سوالات پرسیده شده در مدرسه را خواهید دید</h1>
}

SchoolQuestion.getLayout = getAppLayout({
  navbar: <PrimaryNavbar />,
  sidebar: <AppSidebar />
});

export default SchoolQuestion;