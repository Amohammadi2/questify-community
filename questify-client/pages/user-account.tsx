import { BackArrow, getNavLayout } from "modules/app-navigation";
import { useAuthGuard } from "modules/auth/route-protector";
import UserProfileDashboard from "modules/user-profile/components/UserProfileDashboard";
import { NextPageWithLayout } from "utils/next-layout";

const UserAccountPage: NextPageWithLayout = () => {

  useAuthGuard();

  return <UserProfileDashboard />
}

UserAccountPage.getLayout = getNavLayout({
  activateSidebar: true,
  navbarContent: (
    <BackArrow />
  )
})


export default UserAccountPage;