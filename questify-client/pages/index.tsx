import type { NextPage } from 'next';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { accountAtom } from '../modules/auth-store/states';

const Home:  NextPage = () => {

  const account = useRecoilValue(accountAtom);

  return (<h1>{ account ? 'HI '+account.username : <Link href="/login">Please login</Link> }</h1>);
}

export default Home;
