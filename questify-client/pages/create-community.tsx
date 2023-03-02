import { BackArrow, getNavLayout } from "modules/app-navigation";
import { useAuthGuard } from "modules/auth/route-protector";
import { CreateCommunityPage } from "modules/questions/communities/management";
import { NextPageWithLayout } from "utils/next-layout";

const CreateCommunity: NextPageWithLayout = () => {
  
  useAuthGuard();
  
  return (
    <CreateCommunityPage />
  )
}

CreateCommunity.getLayout = getNavLayout({
  activateSidebar: false,
  navbarContent: (
    <BackArrow />
  )
})

export default CreateCommunity;