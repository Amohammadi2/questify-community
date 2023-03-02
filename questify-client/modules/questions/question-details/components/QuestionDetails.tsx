import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Text } from "@nextui-org/react";
import { Badge, Filler, FlexColumn, FlexRow, IconButton, ProfileSummery } from "modules/app-ui";
import { LinkMaker } from "modules/link-maker";
import Link from "next/link";
import { IQuestionDetails } from "../interfaces/question-details.interface";
import Comment from "./Comment";
import PostDetails from "./PostDetails";
import ScoreCounter from "./ScoreCounter";


export default function QuestionView({ title, content, author, score, tags, comments, id, publishDate, userVote, loading} : IQuestionDetails & {loading: boolean}) {
  return (
    <PostDetails
      author={author}
      profileSide={
        <Link href={LinkMaker.answerQuestion(id)}>
          <Button size="xs" color="secondary">
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{ marginLeft: '5px' }}
            />
            ارسال پاسخ
          </Button>
        </Link>
      }
      header={<Text h2>{title}</Text>}
      content={content}
      loading={loading}
      comments={comments}
      publishDate={publishDate}
      score={score}
      userVote={userVote}
      tags={tags}
    />
  )
}