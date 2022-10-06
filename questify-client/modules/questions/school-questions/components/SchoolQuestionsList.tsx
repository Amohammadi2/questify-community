import QuestionFilter from "modules/questions/question-filtering/QuestionFilter";
import QuestionListLayout from "modules/questions/question-listing/QuestionListLayout";
import QuestionListRenderer from "modules/questions/question-listing/QuestionListRenderer";
import { QuestionListContainer, QuestionPost, QuestionList } from "../../question-listing";
import { useSchoolQuestions } from "../graphql/useSchoolQuestions";
import { useSchoolQuestionTags } from "../graphql/useSchoolQuestionTags";

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
    <QuestionList
      searchEnabled
      tagFilterEnabled
      categories={['جدید', 'پرطرفدار', 'بحث برانگیز']}
      useQuestions={(filters) => useSchoolQuestions(schoolId, filters)}
      useTags={()=>useSchoolQuestionTags(schoolId)}
      listRenderer={(stats) => 
        <QuestionListRenderer
          {...stats}
          QuestionRenderer={QuestionPost}
        />
      }
    />
  );
}