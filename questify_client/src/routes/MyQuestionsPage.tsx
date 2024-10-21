import { GET_MY_QUESTIONS } from "@/graphql/get-my-questions";
import { isMobileDevice } from "@/utils/is-mobile-device";
import { LinkMaker } from "@/utils/link-maker";
import { useQuery } from "@apollo/client";
import { Container, Divider, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

export function MyQuestionsPage() {

  const { data, loading, fetchMore, refetch } = useQuery(GET_MY_QUESTIONS)

  const questionsList = useMemo(() => {
    return data?.myQuestions?.edges.flatMap(edge => {
      return [
        <Grid container direction="row" sx={{ my: 2.5 }}>
          <Link to={LinkMaker.questionDetails(edge?.node?.id||-1)}>
            <Typography color="primary">{edge?.node?.title}</Typography>
          </Link>
          <div style={{flexGrow:1}} />
          <Typography>{new Date(edge?.node?.created).toLocaleDateString('fa-IR')}</Typography>
        </Grid>,
        <Divider />
      ]
    }).slice(0, -1)
  }, [data?.myQuestions?.edges])

  return (
    <Container maxWidth="md">
      <Typography variant="h4" textAlign='center' sx={{ mb: 3 }}>سوالات من</Typography>
      <InfiniteScroll
        pullDownToRefresh={isMobileDevice()}
        pullDownToRefreshThreshold={150}
        pullDownToRefreshContent={<h3 style={{textAlign: 'center', fontFamily:'Vazirmatn'}}>↓ برای تازه سازی به پایین بکشید</h3>}
        releaseToRefreshContent={
          <h3 style={{textAlign: 'center', fontFamily:'Vazirmatn'}}>↑ رها کنید</h3>
        }
        refreshFunction={()=>refetch()}
        dataLength={data?.myQuestions?.edges.length || 0}
        next={()=>fetchMore({ variables: { after: data?.myQuestions?.pageInfo.endCursor} }).then(res => console.log(res))}
        hasMore={data?.myQuestions?.pageInfo.hasNextPage || false}
        endMessage={<></>}
        loader={<h3 style={{textAlign: 'center', fontFamily:'Vazirmatn'}}>در حال بارگزاری ...</h3>}
        style={{ padding: '0px 10px' }}
      >
        {questionsList}
      </InfiniteScroll>
    </Container>
  )
}