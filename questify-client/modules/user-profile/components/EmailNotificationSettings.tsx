import { Text, Switch } from "@nextui-org/react";
import { FlexColumn, FlexRow, Filler } from "modules/app-ui";
import BorderedBox from "../ui/BorderedBox";


export default function EmailNotificationSettings() {
  return (
    <BorderedBox css={{ flexGrow: 1 }}>
      <Text h3>تنظیمات اطلاع‌رسانی ایمیلی</Text>
      <Text css={{ mt: '$3' }}>
        شما می توانید از طریق ایمیل از اتفاقاتی که رخ میدهد با خبر شوید.
        موارد مورد نظر خود را از لیست زیر فعال کنید.
      </Text>
      <FlexColumn css={{ mt: '$10', py: '$5' }}>
        <FlexRow css={{ py: '$5' }}>
          <Text b>امنیت و حساب کاربری:</Text>
          <Text>(ورود و خروج از حساب کاربری، درخواست های تغییر رمز عبور و ...)</Text>
          <Filler />
          <Switch />
        </FlexRow>
        <FlexRow css={{ py: '$5' }}>
          <Text b>پرسش و پاسخ:</Text>
          <Text>(پاسخ سوالات پرسیده شده، درخواست های پاسخ، کامنت ها، پاسخ سوالات در حال پیگیری و ...)</Text>
          <Filler />
          <Switch />
        </FlexRow>
        <FlexRow css={{ py: '$5' }}>
          <Text b>ایمیل های سیستمی:</Text>
          <Text>(خلاصه ای از برگزیده های هفته اخیر، گزارش عملکرد، اطلاع رسانی آپدیت ها)</Text>
          <Filler />
          <Switch />
        </FlexRow>
      </FlexColumn>
    </BorderedBox>
  )
}