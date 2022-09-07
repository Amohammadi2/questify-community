import { Loading, Text } from "@nextui-org/react";
import { APIStats } from "@utils/api-stats.interface";
import { ReactNode } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { IQuestion } from "../entities";

interface IQuestionListProps extends APIStats<IQuestion[]> {
  QuestionRenderer: (props: IQuestion) => ReactElement;
}

export default function QuestionList({ data: questions, loading, error, QuestionRenderer } : IQuestionListProps) {
  
  if (loading)
    return (
      <Loading css={{ mt: '$15' }} />
    );
  
  if (error)
    return (
      <Text color="$red600" css={{ mt: '$15' }}>we are in error?{error}</Text>
    )
  
  return (
    <>
      {questions?.map(q=>(
        <QuestionRenderer {...q} />
      ))}
    </>
  );
}