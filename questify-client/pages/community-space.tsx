import { Text } from "@nextui-org/react";
import { BackArrow, getNavLayout } from "modules/app-navigation";
import { NextPageWithLayout } from "utils/next-layout";

const CommunitySpacePage: NextPageWithLayout = () => {
  return (
    <Text h1 css={{ textAlign: 'center' }}>
      به زودی... انشاالله
    </Text>
  )
}

CommunitySpacePage.getLayout = getNavLayout({
  activateSidebar: true,
  navbarContent: <BackArrow />
})

export default CommunitySpacePage;