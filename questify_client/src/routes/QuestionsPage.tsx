import QuestionSummary from "@/components/QuestionSummary"
import InfiniteScroll from 'react-infinite-scroll-component'
import { Container, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRefresh, faSearch } from "@fortawesome/free-solid-svg-icons"
import { useQuery } from "@apollo/client"
import { GET_QUESTION_FEED } from "@/graphql/get-questions"
import { QuestionRead } from "@/gen"
import { useEffect, useState } from "react"
import { TagInput } from "@/components/TagInput"
import { isEnterKeyPressed } from "@/utils/is-enter-key-pressed"
import { atom, useRecoilState } from "recoil"

const $searchTerm = atom<string|null>({
  key: 'search-term',
  default: null
})

const $tags = atom<string[]>({
  key: 'tags',
  default: []
})

export default function QuestionsPage() {
  
  const [searchTerm, setSearchTerm] = useRecoilState($searchTerm)
  const [tags, setTags] = useRecoilState($tags)

  const { data, loading, fetchMore, called, networkStatus, error, refetch } = useQuery(GET_QUESTION_FEED, {
    variables: {
      first: 15,
      searchTerm,
      tags
    }
  })

  useEffect(() => {
    refetch({ tags })
  }, [tags])

  console.log('length = ', data?.questions?.edges.length)

  return (
    <Container maxWidth="md">
      <Grid container direction="column" sx={{ mt: 3}}>
        <TextField
          placeholder="جستجو در سوالات..."
          sx={{ mb: 2 }}
          variant="filled"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faSearch} />
              </InputAdornment>
            )
          }}
          onChange={(e)=>{setSearchTerm(e.currentTarget.value)}}
          value={searchTerm}
          onKeyDown={(e)=>{
            if (isEnterKeyPressed(e)) {
              refetch({
                searchTerm,
                tags
              })
            }
          }}
        />
        <TagInput {...{tags, setTags}} />
        <Divider />
      </Grid>
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