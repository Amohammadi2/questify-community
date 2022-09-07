import QuestionFilter from "modules/questions/question-filtering/QuestionFilter";
import QuestionList from "modules/questions/question-listing/QuestionList";
import QuestionListLayout from "modules/questions/question-listing/QuestionListLayout";
import { QuestionListContainer, QuestionPost } from "../../question-listing";
import { useSchoolQuestions } from "../graphql/useSchoolQuestions";

export default function SchoolQuestionsList({ schoolId }) {
  return (
    <QuestionListLayout>
      <QuestionFilter
        useQuestions={(filter, searchTerm)=>useSchoolQuestions(schoolId, filter, searchTerm)}
        questionLister={(stats) => (
          <QuestionList
            QuestionRenderer={QuestionPost}
            {...stats}
          />
        )}
      />
    </QuestionListLayout>
  )
}