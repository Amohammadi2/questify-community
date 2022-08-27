import { styled } from "@nextui-org/react";
import QuestionPost from "./QuestionPost";

const QuestionContainer = styled('div', {
  px: '$10',
  py: '$5'
});

// Todo: define better interfaces for the data inside
export default function QuestionListContainer({questions}: {questions:any[]}) {
  return (
    <QuestionContainer>
      {questions.map(q=>(
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
  )
}