import { getNavLayout } from "modules/app-navigation";
import { useAuthGuard } from "modules/auth/route-protector";
import { CommunityQuestionList } from "modules/questions/communities/questions-list";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "utils/next-layout";
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenClip } from "@fortawesome/free-solid-svg-icons";

const CommunityPage: NextPageWithLayout = () => {

  useAuthGuard();

  const { query } = useRouter();

  return (
    <CommunityQuestionList communityId={query.communityId as string} />
  )
}

CommunityPage.getLayout = getNavLayout({
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
})


export default CommunityPage;