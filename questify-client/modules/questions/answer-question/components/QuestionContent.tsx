import { Text } from "@nextui-org/react";
import { ContentLoader, FlexColumn, ProfileSummery } from "modules/app-ui";
import { useQuestionContent } from "../hooks/useQuestionContent";

interface IQuestionContentProps {
  questionId: string;
}

export default function QuestionContent({ questionId } : IQuestionContentProps) {
  
  const { data, error, loading }  = useQuestionContent(questionId);

  return (
    <ContentLoader
      dir='col'
      data={data}
      error={error}
      loading={loading}
    >
      {(data) => (
        <>
          <ProfileSummery
            id={data.author.userId}
            img={data.author.profileImg}
            text={data.author.name}
          />
          <Text h2>{data.title}</Text>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </>
      )}
    </ContentLoader>
  )
}