import { $questionsApi } from "@/apis"
import QuestionSummary from "@/components/QuestionSummary"
import { PaginatedQuestionReadList, QuestionRead } from "@/gen"
import InfiniteScroll from 'react-infinite-scroll-component'
import { useApi } from "@/hooks/useApi"
import { Container, Typography } from "@mui/material"
import { useCallback, useState, useEffect } from "react"
import { useRecoilValue } from "recoil"

export default function QuestionsPage() {
  
  const questionsApi = useRecoilValue($questionsApi)
  const [page, setPage] = useState(1)
  const [questions,setQuestions] = useState<QuestionRead[]>([])

  const apiCallback = useCallback(() => {
    return questionsApi.questionsList({
      limit: 20,
      offset: 20 * (page - 1)
    })
  }, [page])

  const [fetchQuestions, { response, loading, error }] = useApi(apiCallback)

  // fetcher
  useEffect(() => {
    fetchQuestions()
  }, [page])

  // response tracker
  useEffect(() => {
    if (response?.results) {
      setQuestions([...questions, ...response.results])
    }
  }, [response])

  const hasMore = Boolean(response?.next)

  const loadMore = () => {
    setPage(p => p+1)
  }

  return (
    <Container maxWidth="md">
      {page === 1 && loading && <Typography>در حال بارگزاری</Typography>}
      <InfiniteScroll
        dataLength={questions.length}
        next={loadMore}
        hasMore={hasMore}
        endMessage={<></>}
        loader={<p>در حال بارگزاری</p>}
      >
        {questions.map(question => <QuestionSummary {...question} key={question.id} />)}
      </InfiniteScroll>
    </Container>
  )
}