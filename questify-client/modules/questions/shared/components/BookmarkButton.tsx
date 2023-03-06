import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "modules/app-ui";

interface IBookmarkData {
  bookmarked: boolean;
  qid: string;
}

export default function BookmarkButton({ bookmarked, qid } : IBookmarkData) {
  return (
    <IconButton>
      <FontAwesomeIcon
        icon={faBookmark}
        style={{
          color: bookmarked ? 'black' : 'rgb(150,150,150)'
        }}
      />
    </IconButton>
  )
}