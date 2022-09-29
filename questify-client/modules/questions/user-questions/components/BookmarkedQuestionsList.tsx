import { Grid, Loading, styled } from "@nextui-org/react";
import { Box } from "modules/app-ui";
import { QuestionListLayout, QuestionOneLiner } from "modules/questions/question-listing";
import { useBookmarkedQuestions } from "../graphql/useBookmarkedQuestions";

const TagsContainer = styled('div', {
  d: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export default function BookmarkedQuestionsList() {
  
  const { data, loading } = useBookmarkedQuestions();

  return (
    <QuestionListLayout
      sideContent={
        <Grid css={{ flexGrow: '1', px: '$5', mt: '$6' }}>
          <Grid.Container justify="center" direction="column">
            <Box>
              <Grid.Container justify="space-between">
                <strong>#ریاضی</strong>
                <span>43 سوال</span>
              </Grid.Container>
              <Grid.Container justify="space-between">
                <strong>#ریاضی</strong>
                <span>43 سوال</span>
              </Grid.Container>
              <Grid.Container justify="space-between">
                <strong>#ریاضی</strong>
                <span>43 سوال</span>
              </Grid.Container>
              <Grid.Container justify="space-between">
                <strong>#ریاضی</strong>
                <span>43 سوال</span>
              </Grid.Container>
            </Box>
          </Grid.Container>
        </Grid>
      }
    >
      {
        loading
          ? <Loading size="lg" css={{ my: '$4' }}/>
          : data?.map((q,i)=> (
              <QuestionOneLiner title={q.title} key={i} id={'fake-id'} />
            ))
      }
    </QuestionListLayout>
  );
}