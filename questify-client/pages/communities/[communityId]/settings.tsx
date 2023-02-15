import { BackArrow, getNavLayout } from "modules/app-navigation";
import { useAuthGuard } from "modules/auth/route-protector";
import { CommunitySettings } from "modules/questions/communities/management";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "utils/next-layout";

const SettingsPage: NextPageWithLayout = () => {
  
  useAuthGuard();

  const { query } = useRouter();

  return (
    <CommunitySettings communityId={query.communityId as string} />
  )
}

SettingsPage.getLayout = getNavLayout({
  activateSidebar: true,
  navbarContent: (
    <BackArrow />
  )
})

export default SettingsPage;