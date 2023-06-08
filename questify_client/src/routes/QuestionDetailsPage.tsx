import { Container, Typography } from "@mui/material"
import { useParams } from "react-router-dom"

export default function QuestionDetailsPage() {
  
  const { qid } = useParams()
  
  return (
    <Container>
      <Typography>hello world: the question id is = {qid}</Typography>
    </Container>
  )
}