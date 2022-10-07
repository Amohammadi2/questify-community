import { Loading, Text } from "@nextui-org/react";
import { APIStats } from "@utils/api-stats.interface";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { IQuestion } from "../entities";

interface IQuestionListProps <TQuestion> extends APIStats<TQuestion[]> {
  QuestionRenderer: <T extends TQuestion> (props: T) => ReactElement;
}

export default function QuestionListRenderer <TQuestion=IQuestion> ({ data: questions, loading, error, QuestionRenderer } : IQuestionListProps<TQuestion>) {
  
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
      {questions?.map((q,i)=>(
        <QuestionRenderer key={i} {...q} />
      ))}
    </>
  );
}