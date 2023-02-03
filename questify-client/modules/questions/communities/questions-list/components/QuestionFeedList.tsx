import ListView from 'modules/app-ui/components/ListView';
import QuestionPoster from "modules/questions/shared/components/QuestionPoster";
import { ICommunityQuestionFeed, IQuestionFeed } from "../../interfaces/feed.type";
import CommunityProfile from "../../management/components/CommunityProfile";
import { useCommunityProfile } from "../../management/hooks/useCommunityProfile";
import { useQuestionFeed } from "../hooks/useQuestionFeed";

export default function QuestionFeedList (p: ICommunityQuestionFeed) {
  const questionFeed = useQuestionFeed(p);
  const envProfile = useCommunityProfile(p.communityId);

  return (
    <ListView
      onSearch={(s) => questionFeed.setSearchTerm(s) }
      data={questionFeed.data}
      loading={questionFeed.loading}
      error={questionFeed.error}
      header={
        <CommunityProfile profileData={envProfile} />
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