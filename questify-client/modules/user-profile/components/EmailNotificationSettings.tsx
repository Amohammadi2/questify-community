import { Text, Switch } from "@nextui-org/react";
import { FlexColumn, FlexRow, Filler } from "modules/app-ui";
import BorderedBox from "../ui/BorderedBox";


export default function EmailNotificationSettings() {
  return (
    <BorderedBox css={{ flexGrow: 1 }}>
      <Text h3>تنظیمات اطلاع‌رسانی ایمیلی</Text>
      <Text css={{ mt: '$3' }}>
        جهت اطلاع راجع به رویداد ها از طریق ایمیل، موارد دلخواه را فعال کنید.
      </Text>
      <FlexColumn css={{ mt: '$10', py: '$5' }}>
        <FlexRow css={{ py: '$5' }}>
          <Text b>امنیت و حساب کاربری:</Text>
          <Filler />
          <Switch />
        </FlexRow>
        <FlexColumn>
          <Text>ورود و خروج از حساب کاربری، درخواست های تغییر رمز عبور و ...</Text>
        </FlexColumn>
        <FlexRow css={{ py: '$5' }}>
          <Text b>پرسش و پاسخ:</Text>
          <Filler />
          <Switch />
        </FlexRow>
        <FlexColumn>
          <Text>پاسخ سوالات پرسیده شده، درخواست های پاسخ، کامنت ها، پاسخ سوالات در حال پیگیری و ...</Text>
        </FlexColumn>
        <FlexRow css={{ py: '$5' }}>
          <Text b>ایمیل های سیستمی:</Text>
          <Filler />
          <Switch />
        </FlexRow>
        <FlexColumn>
          <Text>خلاصه ای از برگزیده های هفته اخیر، گزارش عملکرد، اطلاع رسانی آپدیت ها</Text>
        </FlexColumn>
      </FlexColumn>
    </BorderedBox>
  )
}