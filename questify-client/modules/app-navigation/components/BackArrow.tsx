import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { IconButton } from "../../app-ui";

export default function BackArrow() {
  
  const router = useRouter();

  const popBack = () => {
    router.back();
  }
  
  return (
    <IconButton onClick={e=>popBack()}>
      {/* @theme:ref: */}
      <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white' }} />
    </IconButton>
  )
}