import { styled } from "@nextui-org/react"
import { navbarHeight } from "../../constants"

const StyledSpacer = styled('div', {
  '&': {
    mt: navbarHeight
  }
})

// creates enough space between the content and the fixed navigation bar
export default function NavSpacer({ children, mt='0' }) {
  return (
    <StyledSpacer>
      <StyledSpacer css={{ pt: mt }}>
        {children}
      </StyledSpacer>
    </StyledSpacer>
  )
}