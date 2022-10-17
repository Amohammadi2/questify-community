import { faComment, faFileExcel, faFileText, faHeart, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, styled, Text } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Badge, Filler, Liner } from "modules/app-ui";
import Link from "next/link";
import { ISchoolQuestion } from "../interfaces/school-question.interface";

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


export default function SchoolQuestion({title, nAnswers, nLikes, nComments, isChallenge, author, tags} : ISchoolQuestion) {
  return (
    <QuestionBox>
      <Grid.Container direction="row" alignItems="center" css={{ my: '$5' }}>
        <Avatar text={author.account.username} css={{ mx: '$3'}} />
        {author.account.username}
        <Filler />
        <IconNumberContainer icon={faHeart} number={nLikes} />
        <IconNumberContainer icon={faComment} number={nComments} />
      </Grid.Container>
      <Liner />
      <Grid.Container direction="column" css={{ my: '$5' }}>
        <Link href="/question-details?qid=fake-one">
          <Text h3 css={{ cursor: 'pointer' }}>{title}</Text>
        </Link>
        <Grid.Container direction="row">
          {tags.map(t => <Badge content={t} />)}
        </Grid.Container>
      </Grid.Container>
      <Liner />
      <Grid.Container direction="row" alignItems="center" css={{ my: '$4' }}>
        <AnswerBadge className="">3 پاسخ ارسال شده</AnswerBadge>
        <Filler />
        <Text css={{ mx: '$5' }}>پاسخ ها توسط: </Text>
        <Avatar size="sm" text="A" css={{ mx: '-$1' }}/>
        <Avatar size="sm" text="A" css={{ mx: '-$1' }}/>
        <Avatar size="sm" text="A" css={{ mx: '-$1' }}/>
      </Grid.Container>
    </QuestionBox>
  );
}