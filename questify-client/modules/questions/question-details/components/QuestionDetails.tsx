import { Text } from "@nextui-org/react";
import { Badge, Filler, FlexColumn, FlexRow, IconButton, ProfileSummery } from "modules/app-ui";
import { IQuestionDetails } from "../interfaces/question-details.interface";
import Comment from "./Comment";
import PostDetails from "./PostDetails";
import ScoreCounter from "./ScoreCounter";


export default function QuestionView({ title, content, author, score, tags, comments, id, publishDate, userVote, loading} : IQuestionDetails & {loading: boolean}) {
  return (
    <PostDetails
      author={author}
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