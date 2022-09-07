import { QuestionListContainer } from "../../components";
import { useSchoolQuestions } from "../graphql/useSchoolQuestions";

export default function SchoolQuestionsList({ schoolId }) {
  return (
    <QuestionListContainer
      useQuestions={(searchTerm, filter)=>useSchoolQuestions(schoolId, filter, searchTerm)}
    />
  )
}