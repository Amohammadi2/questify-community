import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { IconButton } from "../../app-ui";

export function BackArrow() {
  
  const router = useRouter();

  const popBack = () => {
    router.back();
  }
  
  return (
    <IconButton onClick={e=>popBack()}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </IconButton>
  )
}