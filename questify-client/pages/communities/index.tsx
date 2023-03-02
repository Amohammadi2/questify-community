import { getNavLayout } from "modules/app-navigation";
import { useAuthGuard } from "modules/auth/route-protector";
import { JoinedCommunitiesList } from "modules/questions/communities/joined-communities-list";
import { CreateCommunityPage } from "modules/questions/communities/management";
import { NextPageWithLayout } from "utils/next-layout";

const CommunitiesListPage: NextPageWithLayout = () => {

  useAuthGuard();

  return (
    <JoinedCommunitiesList />
  )
}

CommunitiesListPage.getLayout = getNavLayout({
  activateSidebar: true,
  navbarContent: (
    <CreateCommunityPage.LinkButton />
  )
})

export default CommunitiesListPage;