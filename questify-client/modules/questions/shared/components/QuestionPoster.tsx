import { faComment, faFileExcel, faFileText, faHeart, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, styled, Text } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Badge, Filler, FlexRow, Liner } from "modules/app-ui";
import { IQuestionPoster } from "../interfaces/question-poster.interface";
import Link from "next/link";

const QuestionBox = styled('div', {
  border: '1px solid $gray500',
  borderRadius: '$md',
  px: '$6',
  my: '$3',
})

const AnswerBadge = styled('div', {
  d: 'flex',
  flexDirection: 'column',
  py: '$3',
  px: '$4',
  mx: '$2',
  borderRadius: '$sm',
  color: '$gray800',
  border: '1px solid $gray200',
  '&.active': {
    color: '#123E25',
    border: '1px solid $green400'
  },
  fontSize: '13px'
})

const IconGen = ({icon, style}: any) => {
  return <FontAwesomeIcon icon={icon} style={{fontSize: '22px', color: 'rgb(135, 145, 166)', margin: '0px 6px', ...style}} />
}

const IconNumberContainer = ({ icon, number }: any) => {
  return (
    <div style={{ display: 'flex' }}>
      <IconGen icon={icon} />
      <div style={{ margin: '0px 2px' }}>
        {number}
      </div>
    </div>
  );
}


export default function QuestionPoster({ title, tags, scores, author, nAnswers, nComments, recentAnswers, id } : IQuestionPoster) {
  return (
    <QuestionBox>
      <Grid.Container direction="row" alignItems="center" css={{ my: '$5' }}>
        <Link href={`/user-profile?id=${author.userId}`}>
          <FlexRow css={{ cursor: 'pointer', alignItems: 'center' }}>
            <Avatar text={author.name} src={author.profileImg} css={{ mx: '$3'}} />
            {author.name}
          </FlexRow>
        </Link>
        <Filler />
        <IconNumberContainer icon={faComment} number={nComments} />
        <Text css={{ mx: '$5' }} color="$gray500">|</Text>
        <Text>امتیاز:</Text>
        <Text css={{ mx: '$3' }}>{scores}</Text>
      </Grid.Container>
      <Liner />
      <Grid.Container direction="column" css={{ my: '$5' }}>
        <Link href={`/question-details?qid=${id}`}>
          <Text h3 css={{ cursor: 'pointer' }}>{title}</Text>
        </Link>
        <Grid.Container direction="row">
          {tags.map(t => <Badge key={t} content={t} />)}
        </Grid.Container>
      </Grid.Container>
      <Liner />
      <Grid.Container direction="row" alignItems="center" css={{ my: '$4' }}>
        <AnswerBadge className="">{nAnswers} پاسخ ارسال شده</AnswerBadge>
        <Filler />
        {recentAnswers.map(
          r => <Link key={r.answerId} href={`/question-details?qid=${id}&answer=${r.answerId}`}><Avatar src={r.author.profileImg} size="sm" zoomed text={r.author.name} css={{ mx: '-$1' }}/></Link>
        )}
      </Grid.Container>
    </QuestionBox>
  );
}