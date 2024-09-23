import { LinkMaker } from "@/utils/link-maker";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export interface HasMetadata {
  metadata: any;
}

export function AnswerAcceptedNotif({metadata}: HasMetadata) {
  return (
    <Typography>
      <Link to={LinkMaker.questionDetails(metadata.question_id)}><Typography color="primary" sx={{display: 'inline'}}>پاسخ</Typography></Link> شما را پذیرفت
    </Typography>
  )
}

export function QuestionAnsweredNotif({metadata}: HasMetadata) {
  return (
    <Typography>
      به <Link to={LinkMaker.questionDetails(metadata.question_id)}><Typography color="primary" sx={{display: 'inline'}}>سوال</Typography></Link> شما پاسخ داد
    </Typography>
  )
}

export function QuestionSubscribedNotif({metadata}: HasMetadata) {
  return (
    <Typography>
      <Link to={LinkMaker.questionDetails(metadata.question_id)}><Typography color="primary" sx={{display: 'inline'}}>سوال</Typography></Link> شما را پیگیری کرد
    </Typography>
  )
}

export function SubscribedQuestionAnsweredNotif({metadata}: HasMetadata) {
  return (
    <Typography>
      به <Link to={LinkMaker.questionDetails(metadata.question_id)}><Typography color="primary" sx={{display: 'inline'}}>سوالی</Typography></Link> که پیگیری کرده بودید پاسخ داد
    </Typography>
  )
}


export interface INotificationContentProps {
  notifType: string;
  metadata: any;
  message: string;
}

export default function NotificationContent({notifType, metadata, message} : INotificationContentProps) {
  const types = {
    'question-answered'() {
      return <QuestionAnsweredNotif {...{metadata}} />
    },
    'answer-accepted'() {
      return <AnswerAcceptedNotif {...{metadata}} />
    },
    'question-subscribed'() {
      return <QuestionSubscribedNotif {...{metadata}} />
    },
    'subscribed-question-answered'() {
      return <SubscribedQuestionAnsweredNotif {...{metadata}} />
    }
  }

  if (Object.keys(types).includes(notifType))
    // @ts-ignore
    return types[notifType]()
  return message
}