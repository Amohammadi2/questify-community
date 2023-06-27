import QuestionSummary from "@/components/QuestionSummary"
import InfiniteScroll from 'react-infinite-scroll-component'
import { Container, IconButton, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRefresh } from "@fortawesome/free-solid-svg-icons"
import { useQuery } from "@apollo/client"
import { GET_QUESTION_FEED } from "@/graphql/get-questions"
import { QuestionRead } from "@/gen"



export default function QuestionsPage() {
  

  const { data, loading, fetchMore, called, networkStatus, error, refetch } = useQuery(GET_QUESTION_FEED, {
    variables: {
      first: 15
    }
  })

  console.log('length = ', data?.questions?.edges.length)

  return (
    <Container maxWidth="md">
      <InfiniteScroll
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={<h3 style={{textAlign: 'center', fontFamily:'Vazirmatn'}}>↓ برای تازه سازی به پایین بکشید</h3>}
        releaseToRefreshContent={
          <h3 style={{textAlign: 'center', fontFamily:'Vazirmatn'}}>↑ رها کنید</h3>
        }
        refreshFunction={()=>refetch()}
        dataLength={data?.questions?.edges.length || 0}
        next={()=>fetchMore({ variables: { after: data?.questions?.pageInfo.endCursor} }).then(res => console.log(res))}
        hasMore={data?.questions?.pageInfo.hasNextPage || false}
        endMessage={<></>}
        loader={<h3 style={{textAlign: 'center', fontFamily:'Vazirmatn'}}>در حال بارگزاری ...</h3>}
        style={{ padding: '0px 10px' }}
      >
        {data?.questions?.edges.map(question => <QuestionSummary {...(question?.node as unknown as QuestionRead)} key={question?.node?.id} />)}
      </InfiniteScroll>
      <IconButton sx={{ position: 'fixed', left: 20, bottom: 30, bgcolor: 'white', boxShadow: 2 }} onClick={()=>refetch()}>
        <FontAwesomeIcon
          icon={faRefresh}
          style={{ color: 'black' }}
        />
      </IconButton>
    </Container>
  )
}