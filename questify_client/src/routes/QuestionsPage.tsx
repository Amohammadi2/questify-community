import QuestionSummary from "@/components/QuestionSummary"
import InfiniteScroll from 'react-infinite-scroll-component'
import { Container, Typography } from "@mui/material"
import { useQuestionsList } from "@/hooks/useQuestionsList"
import PageLoader from "@/components/PageLoader"

export default function QuestionsPage() {
  
  const { page, hasMore, loading, questions, loadMore } = useQuestionsList()

  return (
    <Container maxWidth="md">
      {page === 1 && loading && <PageLoader fixed />}
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