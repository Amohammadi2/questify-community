import { Grid, Loading, styled, Text } from "@nextui-org/react";
import { Filler, FlexColumn, FlexContainer, FlexRow } from "modules/app-ui";
import CommunityHeaderBar from "modules/questions/communities/management/components/CommunityHeaderBar";
import { useCommunityProfile } from "modules/questions/communities/management/hooks/useCommunityProfile";
import useQuestionDetails from "../hooks/useQuestionDetail";
import AnsewrDetails from "./AnswerDetails";
import QuestionView from "./QuestionDetails";

interface IQuestionDetailsProps {
  questionId: string;
}

export default function QuestionDetailsView({ questionId } : IQuestionDetailsProps) {
  
  const communityProfile = useCommunityProfile('somefake-id'); // Todo: combine this with question details (we can fetch all the data in one gql call)
  const { loading, data, error } = useQuestionDetails(questionId);
  
  if (loading || !data) 
    return (
      <Grid.Container direction="column" css={{ width: '100%', height: '100%' }} justify="center" alignItems="center">
        <Loading size="lg" />
        <Text size="sm" color="$gray500">درحال بارگذاری</Text>
      </Grid.Container>
    );

  return (
    <FlexContainer>
      <CommunityHeaderBar profileData={communityProfile}/>
      <QuestionView {...{loading, ...data}} />
      {data.answers.map(a => (
        <>
        <Filler css={{ h: '2px', bg: '$black', mt: '$10' }} />
        <AnsewrDetails {...{loading, ...a}} />
        </>
      ))}
    </FlexContainer>
  );
}