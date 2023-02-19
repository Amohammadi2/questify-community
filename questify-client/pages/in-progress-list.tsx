import { Text } from "@nextui-org/react";
import { BackArrow, getNavLayout } from "modules/app-navigation";
import { FlexContainer } from "modules/app-ui";
import { NextPageWithLayout } from "utils/next-layout";

const InProgressListPage: NextPageWithLayout = () => {
  return (
    <FlexContainer>
      <Text h1 css={{ textAlign: 'center' }}>
        به زودی... انشاالله
      </Text>
    <Text color="$gray800">
      برخی اوقات پیش می آید که سوالی که توسط فرد دیگری پرسیده شده سوال شما هم باشد. ما در سدد
      ارائه قابلیتی هستیم که به شما این اجازه را بدهد که این نوع سوالات را پیگیری کنید و از آخرین
      پاسخ تایید شده آنها باخبر شوید. این قابلیت در فاز بعدی پروژه ارائه خواهد شد.
    </Text>
    </FlexContainer>
  )
}

InProgressListPage.getLayout = getNavLayout({
  activateSidebar: true,
  navbarContent: <BackArrow />
})

export default InProgressListPage;