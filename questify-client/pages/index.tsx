import type { NextPage } from 'next';
import { Card, styled, Button} from "@nextui-org/react";
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { accountAtom } from '../modules/auth-store/states';
import LandingIllustration from "../modules/assets/landing-illustration.svg";
import Tick from "../modules/assets/custom-icons/tick.svg";
import { FlexColumn, FlexRow, ItemCard, NavSpacer } from '../modules/app-ui';
import { PrimaryNavbar, BigHeader, HeaderDescription } from '../modules/landing-page';


const Home: NextPage = () => {

  const account = useRecoilValue(accountAtom);

  const EnterButton = (
    <Link href={account ? '/school-questions' : '/login'}>
      <Button>
        {account ? 'ورود به صفحه سوالات' : 'ورود به حساب کاربری'}
      </Button>
    </Link>
  );

  return (
    <>
      <PrimaryNavbar />
      <NavSpacer mt="30px">
        <FlexRow css={{ justifyContent: 'space-around'}}>
          <LandingIllustration />
          <FlexColumn>
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
            {EnterButton}
          </FlexColumn>
        </FlexRow>
      </NavSpacer>
    </>
  );
}

export default Home;
