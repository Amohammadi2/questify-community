import { BackArrow, getNavLayout } from "modules/app-navigation";
import { RegistrationRequestPage } from "modules/registration/components/RegistrationRequestPage";

const Page = RegistrationRequestPage;

Page.getLayout = getNavLayout({
  activateSidebar: false,
  navbarContent: <BackArrow />
})

export default Page;