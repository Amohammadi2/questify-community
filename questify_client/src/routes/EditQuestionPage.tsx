import { QuestionForm } from "@/components/forms/components/QuestionForm";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

export default function EditQuestionPage() {

  const { qid } = useParams()

  return (
    <Container>
      <QuestionForm qid={qid || null} />
    </Container>
  )
}