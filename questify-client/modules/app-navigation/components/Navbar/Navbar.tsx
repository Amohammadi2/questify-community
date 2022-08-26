import { styled } from "@nextui-org/react";
import { navbarHeight } from "../../../app-ui/constants";
import Logo from "../../assets/logo.svg";
import Link from "next/link";


const StyledNavbarUI = styled('nav', {
  '&': {
    top: '0',
    width: '100%',
    height: navbarHeight,
    backgroundColor: '$primary',
    color: '$primarySolidContrast',
    d: 'flex',
    alignItems: 'center',
    px: '$10'
  } 
})

export default function Navbar({ children }) {
  return (
    <StyledNavbarUI>
      <Link href="/"><Logo style={{ cursor: 'pointer' }} /></Link>
      <div style={{ flexGrow: '1' }} />
      {children}
    </StyledNavbarUI>
  )
}