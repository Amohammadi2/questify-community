import { Button } from "@nextui-org/react";
import { getNavLayout } from "../modules/app-navigation/layouts/NavLayout";
import { useRequireAuthentication } from "../modules/auth/route-protector";
import { SchoolQuestionsList } from "../modules/questions";
import { NextPageWithLayout } from "../utils/next-layout";

const SchoolQuestion: NextPageWithLayout = ( ) => {
  useRequireAuthentication();
  
  return (
    <SchoolQuestionsList schoolId={'sdfsf'} />
  )
}

SchoolQuestion.getLayout = getNavLayout({
  activateSidebar: true,
  navbarContent: (
    <></>
  )
});

export default SchoolQuestion;