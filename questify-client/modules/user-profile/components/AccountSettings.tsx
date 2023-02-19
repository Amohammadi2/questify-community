import { faLock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, Button, Modal, Input } from "@nextui-org/react";
import { Filler, FlexColumn, FlexRow } from "modules/app-ui";
import { EditableTextField } from "modules/shared";
import { useCallback, useEffect, useState } from "react";
import BorderedBox from "../ui/BorderedBox";

export default function AccountSettings() {

  const [email, setEmail] = useState<string | null>('mohammadiashkan1384@gmail.com');
  const [verificationModalOpen, setVerificationModalOpen] = useState<boolean>(false);
  const [isEmailVerified, setEmailVerified] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  useEffect(() => { setEmailVerified(false) }, [email]);

  const verifyEmail = useCallback(() => {
    if (code === 'admin') {
      setEmailVerified(true);
      setVerificationModalOpen(false);
      setCode('');
    }
  }, [code])

  return (
    <>
      <Modal
        open={verificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
        closeButton
        preventClose
      >
        <Modal.Header>
          <Text h3>کد راستی‌آزمایی را وارد کنید</Text>
        </Modal.Header>
        <Modal.Body css={{ textAlign: 'right' }}>
          <Text css={{ mb: '$3' }}>این کد به ایمیل شما ارسال شده است. درصورتی که کد یافت نشد قسمت هرزنامه را نیز برسی کنید.</Text>
          <Input placeholder="کد راستی‌آزمایی" value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => { if (e.key === "Enter") verifyEmail() }} />
          <Button onPress={verifyEmail}>
            برسی
          </Button>
        </Modal.Body>
      </Modal>
      <BorderedBox>
        <Text h3>تنظیمات حساب کاربری</Text>
        <FlexColumn css={{ py: '$5', borderTop: '1px solid $gray100', '@sm': { flexDirection: 'row' } }}>
          <FlexRow css={{ alignItems: 'center' }}>
            <Text b>ایمیل شما:</Text>
            <EditableTextField
              content={email}
              onEditRequest={(e) => { setEmail(e); return true }}
            />
          </FlexRow>
          <Filler />
          <FlexRow css={{ alignItems: 'center' }}>
            <Button size="xs" onClick={() => setVerificationModalOpen(true)} disabled={isEmailVerified}>راستی آزمایی</Button>
            <Text css={{ mx: '$2' }}>وضعیت: </Text>
            <Text css={{ mx: '$2' }} color={!isEmailVerified ? "error" : "success"}>{!isEmailVerified ? 'راستی آزمایی نشده' : 'راستی آزمایی شده'}</Text>
          </FlexRow>
        </FlexColumn>
        <FlexColumn
          css={{
            py: '$5',
            borderTop: '1px solid $gray100',
            justifyContent: 'center',
            '@sm': { flexDirection: 'row' } 
          }}
        >
          <Button css={{ mx: '$3' }} flat color="primary">
            <FontAwesomeIcon
              icon={faLock}
              style={{ margin: '0px 4px' }}
            />
            تغییر رمز عبور
          </Button>
          <Button css={{ mx: '$3' }} flat color="error">
            <FontAwesomeIcon
              icon={faTrash}
              style={{ margin: '0px 4px' }}
            />
            حذف حساب کاربری
          </Button>
        </FlexColumn>
      </BorderedBox>
    </>
  );
}