import { styled } from "@nextui-org/react";
import { Navbar } from "../../app-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { accountAtom } from "../../auth-store/states";
import { Avatar } from "@nextui-org/react";


const Username = styled('span', {
  px: '$5',
  verticalAlign: 'center'
});

export default function PrimaryNavbar() {

  const account = useRecoilValue(accountAtom);

  return (
    <Navbar>
      {
        account
          ? (
            <>
              <Username>{account.username}</Username>
              <Avatar squared text="A" />
            </>
          )
          : (
            <>
              <Link href="/login">
                <FontAwesomeIcon icon={faRightToBracket} style={{ cursor: 'pointer' }} size="lg" />
              </Link>
            </>
          )
      }
    </Navbar>
  );
}