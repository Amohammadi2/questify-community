import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import Link from "next/link";
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
    <Link href="/ask-question">
      <Button
        icon={<FontAwesomeIcon icon={faAdd} />}
        size="sm"
      >
        پرسش سوال
      </Button>
    </Link>
  )
});

export default SchoolQuestion;