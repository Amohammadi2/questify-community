import useQuestionTagList from "modules/questions/graphql/useQuestionTagList";
import { QuestionOneLiner, QuestionList } from "modules/questions/question-listing";
import QuestionListRenderer from "modules/questions/question-listing/QuestionListRenderer";
import { useMyQuestions } from "../graphql/useMyQuestions";

export default function BookmarkedQuestionsList() {
  
  return (
    <QuestionList <{title:string,id:string}>
      searchEnabled
      tagFilterEnabled
      useQuestions={(filters) => useMyQuestions(filters)}
      useTags={()=>useQuestionTagList('my-questions')}
      listRenderer={(stats) => (
        <QuestionListRenderer <{title:string,id:string}>
          {...stats}  
          QuestionRenderer={QuestionOneLiner}
        />
      )}
    />
  )
}