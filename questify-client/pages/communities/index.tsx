import { getNavLayout } from "modules/app-navigation";
import { useAuthGuard } from "modules/auth/route-protector";
import { JoinedCommunitiesList } from "modules/questions/communities/joined-communities-list";
import { NextPageWithLayout } from "utils/next-layout";

const CommunitiesListPage: NextPageWithLayout = () => {

  useAuthGuard();

  return (
    <JoinedCommunitiesList />
  )
}

CommunitiesListPage.getLayout = getNavLayout({
  activateSidebar: true
})

export default CommunitiesListPage;