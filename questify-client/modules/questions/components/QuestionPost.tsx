import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, styled, Text } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { IconButton } from "../../app-ui";

const QuestionContainer = styled('div', {
  '&:hover > .q-box': {
    transform: 'translateY(-10px)',
    boxShadow: '0px 4px 5px 1px rgb(200,200,200)'
  },
  my: '$10',
  maxWidth: '600px'
})

const QuestionBox = styled('div', {
  transition: 'all 0.2s ease-out',
  backgroundColor: '$gray100',
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
      <QuestionBox className="q-box">
        <Text h2>{title}</Text>
        <Text>{content}</Text>
      </QuestionBox>
    </QuestionContainer>
  );
}