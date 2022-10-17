import useQuestionTagList from "modules/questions/graphql/useQuestionTagList";
import QuestionListLayout from "modules/questions/question-listing/QuestionListLayout";
import QuestionListRenderer from "modules/questions/question-listing/QuestionListRenderer";
import { QuestionPost, QuestionList } from "../../question-listing";
import { useSchoolQuestions } from "../graphql/useSchoolQuestions";
import { ISchoolQuestion } from "../interfaces/school-question.interface";
import SchoolQuestion from "./SchoolQuestion";

export default function SchoolQuestionsList({ schoolId }) {
  // return (
  //   <QuestionListLayout>
  //     <QuestionFilter
  //       useQuestions={(filter, searchTerm)=>useSchoolQuestions(schoolId, filter, searchTerm)}
  //       questionLister={(stats) => (
  //         <QuestionList
  //           QuestionRenderer={QuestionPost}
  //           {...stats}
  //         />
  //       )}
  //     />
  //   </QuestionListLayout>
  // )

  return (
    <QuestionList <ISchoolQuestion>
      searchEnabled
      tagFilterEnabled
      categories={['جدید', 'پرطرفدار', 'بحث برانگیز']}
      useQuestions={(filters) => useSchoolQuestions(schoolId, filters)}
      useTags={()=>useQuestionTagList('school')}
      listRenderer={(stats) => 
        <QuestionListRenderer
          {...stats}
          QuestionRenderer={SchoolQuestion}
        />
      }
    />
  );
}