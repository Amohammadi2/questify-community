import QuestionSummary from "@/components/QuestionSummary"
import { Container, IconButton } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRefresh } from "@fortawesome/free-solid-svg-icons"
import { useQuery } from "@apollo/client"
import { GET_QUESTION_FEED } from "@/graphql/get-questions"
import { QuestionRead } from "@/gen"
import { SearchBar } from "@/components/SearchBar"
import { useEffect, useMemo, useRef, useState } from "react"
import { useVirtualizer } from '@tanstack/react-virtual'
import { atom, useRecoilState } from "recoil"


const $scrollOffset = atom<number>({
  key: 'scroll-offset',
  default: 0
})

export default function QuestionsPage() {
  
  // When the data is loaded from server, it is stored in the cache so when the user moves
  // between pages and then returns back to this page, the `data` variable remains unchanged
  // and also the browser automatically takes care of scroll position tracking stuff. It is
  // important that no excessive `refetch` is emmited when the component mounts,
  // as an example, the search bar was emitting a refetch every time it mounted which caused the
  // cache to be invalidated and the data to be lost. so we must be careful about how we pass
  // the `refetch` functions to different components on this page

  const { data, loading, fetchMore, called, networkStatus, error, refetch: dataRefetch } = useQuery(GET_QUESTION_FEED, {
    variables: {
      first: 15,
      searchTerm: null as string|null,
      tags: [] as string[]
    }
  })

  
  const [loaderMilestone, setLoaderMilestone] = useState(0)
  const [scrollOffset, setScrollOffset] = useRecoilState($scrollOffset)
  
  const questionsCount = data?.questions?.edges.length;
  const hasMore = data?.questions?.pageInfo.hasNextPage || false;
  
  const refetch = (...args : any[]) => {
    setScrollOffset(0)
    setLoaderMilestone(0)
    return dataRefetch(...args)
  }

  useEffect(() => {
    if (loaderMilestone === 0) return
    if (hasMore)
      fetchMore({
        variables: {
          after: data?.questions?.pageInfo.endCursor
        }
      })
  } , [loaderMilestone])

  
  
  const virtualScrollRef = useRef<HTMLDivElement>(null)
  
  const virtualizer = useVirtualizer({
    getScrollElement: () => virtualScrollRef.current!,
    count: questionsCount,
    estimateSize: () => 250
  })
  
  useEffect(() => {
    if (virtualizer.scrollOffset! !== 0) {
      setScrollOffset(virtualizer.scrollOffset!)
      console.log('is setting offset: ', virtualizer.scrollOffset)
    }
  }, [virtualizer.isScrolling])

  useEffect(() => {
    console.log('scrolling to offset: ', scrollOffset)
    virtualizer.scrollToOffset(scrollOffset)
  }, [scrollOffset])
  
  console.log('length = ', questionsCount)

  // Todo: save results to a recoil store in order to keep rendered questions across different routes
  const questionsList = useMemo(() => {
    return data?.questions?.edges.map((question: any) => <QuestionSummary {...(question?.node as unknown as QuestionRead)} key={question?.node?.id} />)
  }, [data?.questions?.edges])


  return (
    <div style={{ width: '100%', height: 'calc(100vh - 70px)', overflow: 'auto' }} ref={virtualScrollRef}>
      <Container maxWidth="md">
        <SearchBar onSearch={(searchTerm, tags) => {
          console.log("REFETCH CALL WAS FROM SEARCH BAR")
          refetch({ searchTerm, tags })
        }} />
        {/* <InfiniteScroll
          pullDownToRefresh={isMobileDevice()}
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
          {questionsList}
        </InfiniteScroll> */}
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map(vitem => {
            if (vitem.index == (questionsCount-1) && vitem.index != loaderMilestone)
              setLoaderMilestone(vitem.index) // causes the rest of questions to be loaded
            return (
              <div key={vitem.key as any} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${vitem.size}px`,
                transform: `translateY(${vitem.start}px)`,
              }}>
                {questionsList[vitem.index]}
              </div>
            )
          })}
        </div>
        <IconButton sx={{ position: 'fixed', left: 20, bottom: 30, bgcolor: 'white', boxShadow: 2 }} onClick={()=>refetch()}>
          <FontAwesomeIcon
            icon={faRefresh}
            style={{ color: 'black' }}
          />
        </IconButton>
      </Container>
    </div>
  )
}