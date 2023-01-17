import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, styled, Text } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { Badge, IconButton } from "../../app-ui";
import { IQuestionWD } from "../entities";

const QuestionContainer = styled('div', {
  '&:hover > .q-box': {
    transform: 'translateY(-10px)',
    boxShadow: '0px 4px 5px 1px rgb(200,200,200)'
  },
  my: '$10',
})

const QuestionBox = styled('div', {
  transition: 'all 0.2s ease-out',
  backgroundColor: '$gray50',
  borderRadius: '$sm',
  py: '$5',
  px: '$7',
  my: '$6',
  cursor: 'pointer',
})

const UsernamePortion = styled('strong', {
  px: '$3'
})

interface IQuestionPost {
  id: string;
  title: string;
  tags: string[];
  score: number;
  author: {
    name: string;
    profileImg: string;
  }
}

export default function QuestionPost({ title, score, tags, author }) {
  return (
    <QuestionContainer>
      <Grid.Container direction="row" alignItems="center">
        <Avatar squared text="A" />
        <UsernamePortion>{author.name}</UsernamePortion>
        <div style={{flexGrow:'1'}}/>
        <Text>34 ذخیره</Text>
        <IconButton>
          <FontAwesomeIcon icon={faBookmark} color="rgb(200,200,200)" />
        </IconButton>
        <IconButton css={{mx: '$2'}}>
          <FontAwesomeIcon icon={faAngleUp} color="green" />
        </IconButton>
        <Text>{score}</Text>
        <IconButton css={{mx: '$2'}}>
          <FontAwesomeIcon icon={faAngleDown} color="red" />
        </IconButton>
      </Grid.Container>
      {/* :ref:(1)  */}
      <Link href="/question-details?qid=some-sort-of-id">
        <QuestionBox className="q-box">
          <Text h3>{title}</Text>
        </QuestionBox>
      </Link>
      <Grid.Container direction="row" alignItems="center">
        {tags.map(t=><Badge content={t} key={t} />)}
      </Grid.Container>
    </QuestionContainer>
  );
}