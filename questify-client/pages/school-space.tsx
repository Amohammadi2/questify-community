import { faAdd, faPenClip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { QuestionFeedList } from "modules/question-feed/components/QuestionFeedList";
import Link from "next/link";
import { getNavLayout } from "../modules/app-navigation/layouts/NavLayout";
import { useAuthGuard } from "../modules/auth/route-protector";
import { SchoolQuestionsList } from "../modules/questions";
import { NextPageWithLayout } from "../utils/next-layout";

const SchoolQuestion: NextPageWithLayout = () => {
  useAuthGuard();
  
  return (
    // <SchoolQuestionsList schoolId={'sdfsf'} />
    <QuestionFeedList feedType="school-space" schoolId="sdfs" />
  )
}

SchoolQuestion.getLayout = getNavLayout({
  activateSidebar: true,
  navbarContent: (
    <Link href="/ask-question">
      <Button
        icon={<FontAwesomeIcon icon={faPenClip} />}
        size="sm"
      >
        پرسش سوال
      </Button>
    </Link>
  )
});

export default SchoolQuestion;