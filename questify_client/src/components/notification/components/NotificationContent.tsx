import { LinkMaker } from "@/utils/link-maker";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { NotifType } from "../enums";

export interface HasMetadata {
  metadata: any;
}

function AnswerAcceptedNotif({metadata}: HasMetadata) {
  return (
    <Typography>
      <Link to={LinkMaker.questionDetails(metadata.question_id)}><Typography color="primary" sx={{display: 'inline'}}>پاسخ</Typography></Link> شما را پذیرفت
    </Typography>
  )
}

function QuestionAnsweredNotif({metadata}: HasMetadata) {
  return (
    <Typography>
      به <Link to={LinkMaker.questionDetails(metadata.question_id)}><Typography color="primary" sx={{display: 'inline'}}>سوال</Typography></Link> شما پاسخ داد
    </Typography>
  )
}

function QuestionSubscribedNotif({metadata}: HasMetadata) {
  return (
    <Typography>
      <Link to={LinkMaker.questionDetails(metadata.question_id)}><Typography color="primary" sx={{display: 'inline'}}>سوال</Typography></Link> شما را پیگیری کرد
    </Typography>
  )
}

function SubscribedQuestionAnsweredNotif({metadata}: HasMetadata) {
  return (
    <Typography>
      به <Link to={LinkMaker.questionDetails(metadata.question_id)}><Typography color="primary" sx={{display: 'inline'}}>سوالی</Typography></Link> که پیگیری کرده بودید پاسخ داد
    </Typography>
  )
}


export interface INotificationContentProps extends HasMetadata {
  notifType: string;
  message: string;
}

export default function NotificationContent({notifType, metadata, message} : INotificationContentProps) {
  const notifPresenters = {
    [NotifType.QUESTION_ANSWERED]() {
      return <QuestionAnsweredNotif {...{metadata}} />
    },
    [NotifType.ANSWER_ACCEPTED]() {
      return <AnswerAcceptedNotif {...{metadata}} />
    },
    [NotifType.QUESTION_SUBSCRIBED]() {
      return <QuestionSubscribedNotif {...{metadata}} />
    },
    [NotifType.SUBSCRIBED_QUESTION_ANSWERED]() {
      return <SubscribedQuestionAnsweredNotif {...{metadata}} />
    }
  }

  if (Object.keys(notifPresenters).includes(notifType))
    // @ts-ignore
    return notifPresenters[notifType]()
  return message
}