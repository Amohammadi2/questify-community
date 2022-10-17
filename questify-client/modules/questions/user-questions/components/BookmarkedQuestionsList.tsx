import useQuestionTagList from "modules/questions/graphql/useQuestionTagList";
import { QuestionOneLiner, QuestionList } from "modules/questions/question-listing";
import QuestionListRenderer from "modules/questions/question-listing/QuestionListRenderer";
import { useBookmarkedQuestions } from "../graphql/useBookmarkedQuestions";

export default function BookmarkedQuestionsList() {
  
  return (
    <QuestionList <{title:string,id:string}>
      searchEnabled
      tagFilterEnabled
      useQuestions={(filters) => useBookmarkedQuestions(filters)}
      useTags={()=>useQuestionTagList('bookmarked')}
      listRenderer={(stats) => (
        <QuestionListRenderer <{title:string,id:string}>
          {...stats}  
          QuestionRenderer={QuestionOneLiner}
        />
      )}
    />
  )
}