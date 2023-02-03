import { FlexColumn, LoaderFlex } from "modules/app-ui";
import SearchBar from "modules/app-ui/components/SearchBar/SearchBar";
import { useQuestionList } from "../graphql/useQuestionList";
import { ICompactQuestion } from "../interfaces/ICompactQuestion.interface";
import { QList } from "../interfaces/QList.type";
import CompactQuestion from "./CompactQuestion";

interface IQuestionList {
  type: QList;
}

export const QuestionList = ({ type } : IQuestionList) => {
  const { setSearchTerm, data, error, loading } = useQuestionList(type);

  return (
    <FlexColumn css={{ w: '100%', px: '$3', alignItems:"center" }}>
      <FlexColumn css={{ maxWidth: '800px', w: '100%' }}>
        <SearchBar onSearch={(s) => setSearchTerm(s)} />
        <LoaderFlex <ICompactQuestion[]>
          dir="col"
          loading={loading}
          data={data}
          error={error}
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
        </LoaderFlex>
      </FlexColumn>
    </FlexColumn>
  )
}