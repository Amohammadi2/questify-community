import { $questionsApi } from "@/apis";
import QuestionSummary from "@/components/QuestionSummary";
import { PaginatedQuestionReadList } from "@/gen";
import { useApi } from "@/hooks/useApi";
import { Container } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function QuestionsPage() {
  
  const questionsApi = useRecoilValue($questionsApi)
  const [page, setPage] = useState(1)

  const getQuestions = useCallback(() => {
    return questionsApi.questionsList({
      limit: 20,
      offset: 20 * (page - 1)
    })
  }, [page])

  const [callApi, { loading, response, error}] = useApi(getQuestions)

  useEffect(() => {
    callApi()
  }, [page])

  return (
    <Container maxWidth="md">
      {response?.results?.map(question => <QuestionSummary {...question} key={question.id} />)}
    </Container>
  )
}