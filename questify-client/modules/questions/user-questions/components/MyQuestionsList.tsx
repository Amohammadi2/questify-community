import { Loading } from "@nextui-org/react";
import QuestionOneLiner from "modules/questions/question-listing/QuestionOneLiner";
import QuestionListLayout from "../../question-listing/QuestionListLayout";
import { useMyQuestions } from "../graphql/useMyQuestions";

export default function MyQuestionsList() {
  
  const { data, loading } = useMyQuestions();

  return (
    <QuestionListLayout>
      {
        loading
          ? <Loading size="lg" css={{ my: '$4' }}/>
          : data?.map((q, i) => (
            <QuestionOneLiner key={i} title={q.title} id={'some-sort-of-fake-id'} />
          ))
      }
    </QuestionListLayout>
  )
}