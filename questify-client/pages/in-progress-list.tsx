import { Text } from "@nextui-org/react";
import { BackArrow, getNavLayout } from "modules/app-navigation";
import { NextPageWithLayout } from "utils/next-layout";

const InProgressListPage: NextPageWithLayout = () => {
  return (
    <Text h1 css={{ textAlign: 'center' }}>
      به زودی... انشاالله
    </Text>
  )
}

InProgressListPage.getLayout = getNavLayout({
  activateSidebar: true,
  navbarContent: <BackArrow />
})

export default InProgressListPage;