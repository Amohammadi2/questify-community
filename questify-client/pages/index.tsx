import type { NextPage } from 'next';
import { Card, styled, Button, Spacer} from "@nextui-org/react";
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { accountAtom } from '../modules/auth/auth-store/states';
import LandingIllustration from "../modules/product-intro/assets/landing-illustration.svg";
import Tick from "../modules/product-intro/assets/custom-icons/tick.svg";
import { FlexColumn, FlexRow } from '../modules/app-ui';
import { ItemCard } from "../modules/product-intro";
import { BigHeader, HeaderDescription } from '../modules/product-intro';
import { getNavLayout } from '../modules/app-navigation/layouts/NavLayout';
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
      <FlexRow css={{
        justifyContent: 'space-around',
        px: '$5',
        pb: '$18',
        ':is(svg)': {
          display: 'none',
          '@sm': {
            display: 'block'
          }
        },
      }}>
        <LandingIllustration />
        <FlexColumn css={{ px: '$4', pt: '$15' }}>
          <BigHeader>𝓠𝓾𝓮𝓼𝓽𝓲𝓯𝔂</BigHeader>
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

Home.getLayout = getNavLayout({});

export default Home;
