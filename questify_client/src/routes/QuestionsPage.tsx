import QuestionSummary from "@/components/QuestionSummary"
import InfiniteScroll from 'react-infinite-scroll-component'
import { Container, IconButton } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRefresh } from "@fortawesome/free-solid-svg-icons"
import { useQuery } from "@apollo/client"
import { GET_QUESTION_FEED } from "@/graphql/get-questions"
import { QuestionRead } from "@/gen"
import { SearchBar } from "@/components/SearchBar"


export default function QuestionsPage() {
  
  // When the data is loaded from server, it is stored in the cache so when the user moves
  // between pages and then returns back to this page, the `data` variable remains unchanged
  // and also the browser automatically takes care of scroll position tracking stuff. It is
  // important that no excessive `refetch` is emmited when the component mounts,
  // as an example, the search bar was emitting a refetch every time it mounted which caused the
  // cache to be invalidated and the data to be lost. so we must be careful about how we pass
  // the `refetch` functions to different components on this page

  const { data, loading, fetchMore, called, networkStatus, error, refetch } = useQuery(GET_QUESTION_FEED, {
    variables: {
      first: 15,
      searchTerm: null as string|null,
      tags: [] as string[]
    }
  })

  
  console.log('length = ', data?.questions?.edges.length)

  return (
    <Container maxWidth="md">
      <SearchBar onSearch={(searchTerm, tags) => {
        console.log("REFETCH CALL WAS FROM SEARCH BAR")
        refetch({ searchTerm, tags })
      }} />
      <InfiniteScroll
        pullDownToRefresh
        pullDownToRefreshThreshold={150}
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
        {data?.questions?.edges.map((question:any) => <QuestionSummary {...(question?.node as unknown as QuestionRead)} key={question?.node?.id} />)}
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