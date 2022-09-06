import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Input, styled } from "@nextui-org/react";
import { IconButton } from "modules/app-ui";
import { ReactNode } from "react";
import QuestionPost from "./QuestionPost";

const QuestionContainer = styled('div', {
  px: '$10',
  py: '$5',
  d: 'flex',
  flexDirection: 'column',
  flexBasis: '100%',
  maxWidth: '650px',
  '@sm': {
    flexBasis: '70%'
  }
});

interface IQuestionListProps {
  questions: any[];
  sideContent?: ReactNode | ReactNode[];
}

// Todo: define better interfaces for the data inside
export default function QuestionListContainer({ questions, sideContent=<></> }: IQuestionListProps) {
  return (
    <Grid.Container direction="row">
      <QuestionContainer>
        <Input
          underlined
          placeholder="جست‌وجو"
          contentRight={<IconButton><FontAwesomeIcon icon={faSearch} style={{color:'gray'}} /></IconButton>}
        />
        {questions.map(q => (
          <QuestionPost
            title={q.title}
            content={q.content}
            score={q.score}
            author={q.author}
            tags={q.tags}
            key={q.id}
          />
        ))}
      </QuestionContainer>
      {sideContent}
    </Grid.Container>
  )
}