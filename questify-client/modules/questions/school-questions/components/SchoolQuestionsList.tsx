import { QuestionListContainer } from "../../components";
import { useSchoolQuestions } from "../hooks/useSchoolQuestions";

export default function SchoolQuestionsList({ schoolId }) {
  const { questions } = useSchoolQuestions(schoolId);

  return (
    <QuestionListContainer questions={questions} />
  )
}