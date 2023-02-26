import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text } from "@nextui-org/react";
import { FlexRow } from "modules/app-ui";
import { IAnswer } from "../interfaces/answer.interface";
import PostDetails from "./PostDetails";

export default function AnsewrDetails({ loading, accepted, author, comments, content, publishDate, score, userVote } : IAnswer & {loading: boolean}) {
  return (
    <PostDetails
      author={author}
      header={
        <FlexRow css={{ alignItems: 'center'}}>
          <FontAwesomeIcon
            icon={faCheckSquare}
            style={{ color: accepted ? 'green' : 'gray', fontSize: '19px' }}
          />
          <Text color={accepted ? '$green700' : '$gray700'} css={{ mx: '$5' }}>
            {accepted ? (
              'پاسخ تایید شده است'
            ) : 'پاسخ تایید نشده است'}
          </Text>
        </FlexRow>
      }
      comments={comments}
      content={content}
      loading={loading}
      publishDate={publishDate}
      score={score}
      userVote={userVote}
    />
  )
}