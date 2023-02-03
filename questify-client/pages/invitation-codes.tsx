import { getNavLayout } from "modules/app-navigation";
import { useAuthGuard } from "modules/auth/route-protector";
import { CreateInvitationButton, InvitationList } from "modules/invitation";
import { NextPageWithLayout } from "utils/next-layout";

const InvitationCodesPage: NextPageWithLayout = () => {
  useAuthGuard();
  
  return (
    <InvitationList />
  );
}

InvitationCodesPage.getLayout = getNavLayout({
  activateSidebar: true,
  navbarContent: <CreateInvitationButton />
})

export default InvitationCodesPage;