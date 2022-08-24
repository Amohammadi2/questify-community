import { styled } from "@nextui-org/react";
import { navbarHeight } from "../../constants";
import Logo from "../../../assets/logo.svg";


const StyledNavbarUI = styled('nav', {
  '&': {
    position: 'fixed',
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
      <Logo />
      <div style={{ flexGrow: '1' }} />
      {children}
    </StyledNavbarUI>
  )
}