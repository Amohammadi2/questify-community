import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Loading, Text } from '@nextui-org/react';
import { FlexColumn, IconButton } from "modules/app-ui";
import SearchBar from 'modules/app-ui/components/SearchBar/SearchBar';
import { useEnvProfile } from "../graphql/useEnvProfile";
import { useQuestionFeed } from "../graphql/useQuestionFeed";
import { IQuestionFeed } from "../interfaces/feed.type";
import QuestionPoster from './QuestionPoster';

export const QuestionFeedList = (p: IQuestionFeed) => {
  const questionFeed = useQuestionFeed(p);
  const envProfile = useEnvProfile(p);

  return (
    <FlexColumn css={{ alignItems: 'center' }}>
      <FlexColumn css={{ maxWidth: '800px', w: '100%', pt: '$10', px:'$3' }}>
        <SearchBar onSearch={(s) => questionFeed.setSearchTerm(s)} />
        {
          questionFeed.loading
          ? (
            <FlexColumn css={{ justifyContent: 'center' }}>
              <Loading css={{ mt: '$10' }} />
              <Text color="$gray800">درحال بارگذاری...</Text>
            </FlexColumn>
          )
          : (
            questionFeed.data
            ? (
              questionFeed.data.map((q,i) => (
                <QuestionPoster
                  key={i}
                  {...q}
                />
              ))
            )
            : (<Text>ایرادی در بارگذاری اطلاعات به وجود آمده است</Text>)
          )
        }
      </FlexColumn>
    </FlexColumn>
  )
}