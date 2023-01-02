import { Text } from '@nextui-org/react';

export function FormDescription() {
  return (
    <ul style={{ listStyleType: 'circle', marginRight: '20px' }}>
      <li>
        <Text>اطلاعات فرم را تکمیل کنید</Text>
      </li>
      <li>
        <Text>منتظر تایید از سوی ادمین های ما بمانید</Text>
      </li>
      <li>
        <Text>فرایند تایید ممکن است یک روز کاری به طول بیانجامد </Text>
      </li>
      <li>
        <Text>ممکن است برای راستی آزمایی با شما تماس حاصل شود</Text>
      </li>
      <li>
        <Text>به محض تایید برای ایمیل شما لینک ورود به اکانتتان ارسال خواهد شد</Text>
      </li>
    </ul>
  );
}
