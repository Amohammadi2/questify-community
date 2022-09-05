import { Grid, Loading, styled, Text } from "@nextui-org/react";
import useQuestionDetails from "../graphql/useQuestionDetail";

const MainContainer = styled('div', {
  d: 'flex',
  flexDirection: 'column',
  mx: '$15',
  my: '$10',
  '@md': {
    mx: '$15'
  }
})

export default function QuestionDetails({ questionId }:{questionId: string}) {
  
  const { loading, data, error } = useQuestionDetails(questionId);
  
  if (loading) 
    return (
      <Grid.Container direction="column" css={{ width: '100%', height: '100%' }} justify="center" alignItems="center">
        <Loading size="lg" />
        <Text size="sm" color="$gray500">درحال بارگذاری</Text>
      </Grid.Container>
    );

  return (
    <MainContainer>
      <Text h1>{data?.title}</Text>
      <Text>{data?.content}</Text>
    </MainContainer>
  );
}