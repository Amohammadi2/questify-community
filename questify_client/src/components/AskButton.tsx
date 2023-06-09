import { $isAuthenticated } from "@/store/auth.store"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Typography } from "@mui/material"
import { useRecoilValue } from "recoil"

export default function AskButton() {
  const isAuthenticated = useRecoilValue($isAuthenticated)

  if (isAuthenticated) {
    return (
      <Button href="/ask" variant="contained" color="primary" sx={{ ml: 2 }}>
        <Typography sx={{ mr: 1 }}>پرسش سوال</Typography>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </Button>
    )
  }

  return null
}