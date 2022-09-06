import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, styled, Text } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { Badge, IconButton } from "../../app-ui";

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


export default function QuestionPost({ title, content, score, tags, author }) {
  return (
    <QuestionContainer>
      <Grid.Container direction="row" alignItems="center">
        <Avatar squared text="A" />
        <UsernamePortion>{author.username}</UsernamePortion>
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
          <Text h2>{title}</Text>
          <Text>{content}</Text>
        </QuestionBox>
      </Link>
      <Grid.Container direction="row" alignItems="center">
        <Badge content="#ریاضی" attentionWorthy={true} />
        <Badge content="#فیزیک" />
        <Badge content="#هندسه" />
        <Badge content="#شیمی" />
      </Grid.Container>
    </QuestionContainer>
  );
}