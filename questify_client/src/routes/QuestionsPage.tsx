import QuestionSummary from "@/components/QuestionSummary"
import InfiniteScroll from 'react-infinite-scroll-component'
import { Container, Typography } from "@mui/material"
import { useQuestionsList } from "@/hooks/useQuestionsList"

export default function QuestionsPage() {
  
  const { page, hasMore, loading, questions, loadMore, refresh } = useQuestionsList()

  return (
    <Container maxWidth="md">
      <InfiniteScroll
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={<h3 style={{textAlign: 'center', fontFamily:'Vazirmatn'}}>↓ برای تازه سازی به پایین بکشید</h3>}
        releaseToRefreshContent={
          <h3 style={{textAlign: 'center', fontFamily:'Vazirmatn'}}>↑ رها کنید</h3>
        }
        refreshFunction={refresh}
        dataLength={questions.length}
        next={loadMore}
        hasMore={hasMore}
        endMessage={<></>}
        loader={<h3 style={{textAlign: 'center', fontFamily:'Vazirmatn'}}>در حال بارگزاری ...</h3>}
      >
        {questions.map(question => <QuestionSummary {...question} key={question.id} />)}
      </InfiniteScroll>
    </Container>
  )
}