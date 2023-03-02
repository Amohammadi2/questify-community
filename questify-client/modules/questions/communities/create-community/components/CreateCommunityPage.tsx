import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@nextui-org/react"
import { BtnSideIcon, FlexContainer } from "modules/app-ui"
import { LinkMaker } from "modules/link-maker"

import Link from "next/link"
import CreateForm from "./CreateForm"

export default function CreateCommunityPage() {
  return (
    <FlexContainer css={{ alignItems: 'center' }}>
      <CreateForm />
    </FlexContainer>
  )
}

// ;-)
CreateCommunityPage.LinkButton = () => {
  return (
    <Link href={LinkMaker.createCommunity()}>
      <Button size="sm">
        <BtnSideIcon icon={faPlus} />
        تاسیس انجمن
      </Button>
    </Link>
  )
}