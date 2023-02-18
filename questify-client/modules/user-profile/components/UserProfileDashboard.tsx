import { Avatar, Switch, Text, Button, Modal, Input } from "@nextui-org/react";
import { Filler, FlexColumn, FlexRow } from "modules/app-ui";
import { useRecoilValue } from "recoil";
import { accountAtom } from "modules/auth/auth-store/states";
import { EditableTextField, ImageEditor } from "modules/shared";
import { useEffect, useState } from "react";

export default function UserProfileDashboard() {

  const [profileImg, setProfileImg] = useState<string|null>('/imgs/snow-fall.jpg');
  const [username, setUsername] = useState('اشکان محمدی');
  const [biography, setBiography] = useState<string|null>('از فرط تواضع به تو ای درگه حاجات، در زهد تو دوریم همه از دار مکافات / مقصود دلم چون که گدایی به در توست، بی بهرگی ام از غم دنیا چه منافات؟')
  const [email, setEmail] = useState<string|null>('mohammadiashkan1384@gmail.com');
  const [verificationModalOpen, setVerificationModalOpen] = useState<boolean>(false);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [isEmailVerified, setEmailVerified] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  useEffect(() => { setEmailVerified(false) }, [email]);

  const verifyEmail = () => {
    if (code === 'admin') {
      setEmailVerified(true);
      setVerificationModalOpen(false);
      setCode('');
    }
  };
  return (
    <>
      <ImageEditor
        isOpen={editorOpen}
        imageLink={profileImg}
        onClose={()=>setEditorOpen(false)}
        onImageEdit={(newProfImg) => setProfileImg(newProfImg)}
      />
      <Modal
        open={verificationModalOpen}
        onClose={()=>setVerificationModalOpen(false)}
        closeButton
        preventClose
      >
        <Modal.Header>
          <Text h3>کد راستی‌آزمایی را وارد کنید</Text>
        </Modal.Header>
        <Modal.Body css={{ textAlign: 'right' }}>
          <Text css={{ mb: '$3' }}>این کد به ایمیل شما ارسال شده است. درصورتی که کد یافت نشد قسمت هرزنامه را نیز برسی کنید.</Text>
          <Input placeholder="کد راستی‌آزمایی" value={code} onChange={e=>setCode(e.target.value)} onKeyDown={e=>{ if (e.key === "Enter") verifyEmail() }} />
          <Button onPress={verifyEmail}>
            برسی
          </Button>
        </Modal.Body>
      </Modal>
      <FlexRow css={{ flexDirection: 'column', alignItems: 'center', '@sm': { flexDirection: 'row', alignItems: 'unset' } }}>
        <FlexColumn
          css={{
            px: '$10',
            py: '$3',
            m: '$4',
            borderRadius: '$md',
            border: '1px solid $gray400',
            '@sm': {
              w: '300px'
            }
          }}
        >
          <FlexColumn css={{ alignItems: 'center' }}>
            <Avatar
              text={username}
              src={profileImg}
              css={{
                w: '230px',
                h: '230px',
                cursor: 'pointer'
              }}
              zoomed
              onClick={()=>setEditorOpen(true)}
            />
          </FlexColumn>
          <Text color="$gray800" css={{textAlign:'center'}}>دنبال کننده: 132 نفر</Text>
            <EditableTextField
              bold
              content={username}
              onEditRequest={(newUserName)=>{setUsername(newUserName);return true;}}
            />
            <EditableTextField
              multiline
              content={biography}
              onEditRequest={(newBio)=>{setBiography(newBio);return true;}}
            />
        </FlexColumn>
        <FlexColumn
          css={{
            m: '$4', borderRadius: '$md',
            border: '1px solid $gray400',
            py: '$5',
            px: '$3',
          }}
        >
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
            <FlexColumn css={{ py: '$5', borderTop: '1px solid $gray100' }}>
              <FlexRow css={{ alignItems: 'center' }}>
                <Text b>ایمیل شما:</Text>
                <EditableTextField
                  content={email}
                  onEditRequest={(e)=>{setEmail(e);return true}}
                />
              </FlexRow>
              <FlexRow css={{ alignItems: 'center' }}>
                <Button size="xs" onClick={()=>setVerificationModalOpen(true)} disabled={isEmailVerified}>راستی آزمایی</Button>
                <Text css={{ mx: '$2' }}>وضعیت: </Text>
                <Text css={{ mx: '$2' }} color={!isEmailVerified ? "error" : "success"}>{!isEmailVerified ? 'راستی آزمایی نشده' : 'راستی آزمایی شده' }</Text>
              </FlexRow>
            </FlexColumn>
        </FlexColumn>
      </FlexRow>
    </>
  )
}