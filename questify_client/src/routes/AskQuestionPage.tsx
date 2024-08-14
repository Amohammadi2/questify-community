import { ContentAggregate } from "@/components/RichTextEditor"
import { Container } from "@mui/material"
import { QuestionForm } from "@/components/forms/components/QuestionForm"



export default function AskQuestionPage() {

  return (
    <Container>
      <QuestionForm qid={null} />
    </Container>
  )
}