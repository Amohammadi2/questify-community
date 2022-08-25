import type { NextPage } from 'next';
import { Card, styled, Button, Spacer} from "@nextui-org/react";
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { accountAtom } from '../modules/auth-store/states';
import LandingIllustration from "../modules/assets/landing-illustration.svg";
import Tick from "../modules/assets/custom-icons/tick.svg";
import { FlexColumn, FlexRow, ItemCard, NavSpacer } from '../modules/app-ui';
import { BigHeader, HeaderDescription } from '../modules/landing-page';
import { AppSidebar, PrimaryNavbar } from "../modules/app-navigation";
import { getAppLayout } from '../modules/app-ui/layouts/AppLayout';
import { NextPageWithLayout } from '../utils/next-layout';


const Home: NextPageWithLayout = () => {

  const account = useRecoilValue(accountAtom);

  const EnterButton = (
    <Link href={account ? '/school-space' : '/login'}>
      <Button>
        {account ? 'ورود به صفحه سوالات' : 'ورود به حساب کاربری'}
      </Button>
    </Link>
  );

  return (
    <>
      <FlexRow css={{ justifyContent: 'space-around', px: '$5'}}>
        <LandingIllustration width={600} />
        <FlexColumn css={{ px: '$4' }}>
          <BigHeader>Questify</BigHeader>
          <HeaderDescription>پلتفرم جامع پرسش و پاسخ درسی</HeaderDescription>
          <ItemCard>
            <Tick />
            <span>امکان پرسش و پاسخ سوال</span>
          </ItemCard>
          <ItemCard>
            <Tick />
            <span>امکان دسته بندی و مرتب سازی</span>
          </ItemCard>
          <ItemCard>
            <Tick />
            <span>امکان مدیریت اعضای مدرسه و محتوا</span>
          </ItemCard>  
          <ItemCard>
            <Tick />
            <span>امکان گلچین سولات برای ارجاع به دبیر</span>
          </ItemCard>
          <Spacer y={.8} />
          {EnterButton}
        </FlexColumn>
      </FlexRow>
    </>
  );
}

Home.getLayout = getAppLayout({
  navbar: <PrimaryNavbar />
});

export default Home;
