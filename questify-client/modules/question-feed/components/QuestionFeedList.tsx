import { FlexRow } from "modules/app-ui";
import ListView from 'modules/app-ui/components/ListView';
import { useEnvProfile } from "../graphql/useEnvProfile";
import { useQuestionFeed } from "../graphql/useQuestionFeed";
import { IQuestionFeed } from "../interfaces/feed.type";
import EnvHeader from "./EnvHeader";
import QuestionPoster from './QuestionPoster';

export const QuestionFeedList = (p: IQuestionFeed) => {
  const questionFeed = useQuestionFeed(p);
  const envProfile = useEnvProfile(p);

  return (
    <ListView
      onSearch={(s) => questionFeed.setSearchTerm(s) }
      data={questionFeed.data}
      loading={questionFeed.loading}
      error={questionFeed.error}
      header={
        <EnvHeader profileData={envProfile} />
      }
    >
      {(data) => {
        if (!data) return null;
        return data.map(d => 
          <QuestionPoster {...d} />
        )
      }}
    </ListView>
  )
}