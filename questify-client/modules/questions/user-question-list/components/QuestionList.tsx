import ListView from "modules/app-ui/components/ListView";
import { useQuestionList } from "../graphql/useQuestionList";
import { QList } from "../interfaces/QList.type";
import CompactQuestion from "./CompactQuestion";

interface IQuestionList {
  type: QList;
}

export const QuestionList = ({ type } : IQuestionList) => {
  const { setSearchTerm, data, error, loading } = useQuestionList(type);

  return (
    <ListView
      data={data}
      loading={loading}
      error={error}
      onSearch={setSearchTerm}
    >
      {(data) => {
        if (!data) return null;
        return data.map((d, i) => {
          return <CompactQuestion
            key={i}
            {...d}
          />
        });
      }}
    </ListView>
  )
}