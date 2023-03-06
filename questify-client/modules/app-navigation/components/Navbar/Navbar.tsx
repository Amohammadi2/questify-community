import { styled, Text } from "@nextui-org/react";
import { navbarHeight } from "../../../app-ui/constants";
import Logo from "../../assets/logo.svg";
import Link from "next/link";
import { Filler } from "modules/app-ui";
import { NotificationAreaButton } from "modules/notifications";


const StyledNavbarUI = styled('nav', {
  '&': {
    top: '0',
    width: '100%',
    height: navbarHeight,
    backgroundColor: '$gray100',
    color: '$primaryContrast',
    d: 'flex',
    alignItems: 'center',
    px: '$10',
    overflow: 'visible'
  } 
})

export default function Navbar({ children }) {
  return (
    <StyledNavbarUI>
      {children}
      <Filler />
      <NotificationAreaButton />
      <Link href="/">
        <div style={{userSelect: 'none', cursor: 'pointer'}}>
          <Text h3>𝓠𝓾𝓮𝓼𝓽𝓲𝓯𝔂</Text>
        </div>
      </Link>
    </StyledNavbarUI>
  )
}