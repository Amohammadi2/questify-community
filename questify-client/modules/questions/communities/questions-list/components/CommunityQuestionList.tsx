import { useState } from 'react';
import { Avatar, Switch, Text } from '@nextui-org/react';
import { ContentLoader, FlexContainer, FlexRow, Tab, TabItem, SearchBar, ProfileImage } from 'modules/app-ui';
import QuestionPoster from "modules/questions/shared/components/QuestionPoster";
import CommunityHeaderBar from "../../management/components/CommunityHeaderBar";
import { useCommunityProfile } from "../../management/hooks/useCommunityProfile";
import { useCommunityQuestions } from "../hooks/useCommunityQuestions";

export default function CommunityQuestionList ({ communityId } : { communityId: string }) {
  const questionFeed = useCommunityQuestions(communityId);
  const profile = useCommunityProfile(communityId);
  const [activeTab, setActiveTab] = useState(1);

  return (
    <FlexContainer>
      <CommunityHeaderBar profileData={profile} />
      <FlexRow css={{
          bg: '$white',
          my: '$5',
          px: '$2',
          py: '$2',
          alignItems: 'center',
          borderTop: '1px solid $gray200',
          borderBottom: '1px solid $gray200',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'thin',
          '-ms-overflow-style': 'none'
        }}
      >
        <Text css={{ mx: '$5', flexShrink: 0 }}>کاربران برتر: </Text>
        <FlexRow css={{ alignItems: 'center', justifyContent: 'center', minWidth: 'content', flexShrink: 0 }}>
          <Text h4 css={{ mx: '$3' }} >1#</Text>
          <ProfileImage img="/imgs/snow-fall.jpg" name="اشکان محمدی" id="some-fake-id" />
          <Text css={{ mx: '$3' }}>اشکان محمدی (13 امتیاز)</Text>
        </FlexRow>
        <FlexRow css={{ alignItems: 'center', justifyContent: 'center', minWidth: 'content', flexShrink: 0 }}>
          <Text h4 css={{ mx: '$3' }} >2#</Text>
          <ProfileImage img="/imgs/snow-fall.jpg" name="مهدی فهیمی" id="some-fake-id" />
          <Text css={{ mx: '$3' }}>مهدی فهیمی (10 امتیاز)</Text>
        </FlexRow>
        <FlexRow css={{ alignItems: 'center', justifyContent: 'center', minWidth: 'content', flexShrink: 0 }}>
          <Text h4 css={{ mx: '$3' }} >3#</Text>
          <ProfileImage img="/imgs/snow-fall.jpg" name="علی حمیدی" id="some-fake-id" />
          <Text css={{ mx: '$3' }}>علی حمیدی (8 امتیاز)</Text>
        </FlexRow>
      </FlexRow>
      <SearchBar onSearch={questionFeed.setSearchTerm} />
      <Tab>
        <FlexRow css={{ alignItems: 'center' }}>
          <Text css={{ px: '$1' }}>بی‌پاسخ</Text>
          <Switch />
        </FlexRow>
        <TabItem n={1} activeTab={activeTab} onActivate={setActiveTab}>آخرین</TabItem>
        <TabItem n={2} activeTab={activeTab} onActivate={setActiveTab}>پربازدید</TabItem>
        <TabItem n={3} activeTab={activeTab} onActivate={setActiveTab}>محبوب</TabItem>
      </Tab>
      <ContentLoader
        dir="col"
        data={questionFeed.data}
        loading={questionFeed.loading}
        error={questionFeed.error}
      >
        {(data) => {
          if (!data) return null;
          return data.map(d => 
            <QuestionPoster {...d} />
          )
        }} 
      </ContentLoader>
    </FlexContainer>
  )
}