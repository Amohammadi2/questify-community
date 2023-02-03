import { faPenClip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { QuestionFeedList } from "modules/questions/communities/questions-list";
import Link from "next/link";
import { getNavLayout } from "../modules/app-navigation/layouts/NavLayout";
import { useAuthGuard } from "../modules/auth/route-protector";
import { NextPageWithLayout } from "../utils/next-layout";

const SchoolQuestion: NextPageWithLayout = () => {
  useAuthGuard();
  
  return (
    // <SchoolQuestionsList schoolId={'sdfsf'} />
    <QuestionFeedList feedType="community-space" communityId="some-community" />
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