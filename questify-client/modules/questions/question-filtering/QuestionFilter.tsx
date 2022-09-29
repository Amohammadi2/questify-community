import { styled, Input } from "@nextui-org/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { APIStats } from "@utils/api-stats.interface";
import { useState } from "react";
import { ReactNode } from "react-markdown/lib/react-markdown";
import { IQuestion, IQuestionFilter } from "../entities";
import { IconButton } from "modules/app-ui";

const FilterBox = styled('div', {
  bg: '$gray50',
  d: 'flex',
  justifyContent: 'center',
})

const FilterOption = styled('div', {
  px: '$4',
  py: '$4',
  flexBasis: '33.3%',
  textAlign: 'center',
  cursor: 'pointer',
  transition: '$button',
  '&:hover': {
    bg: '$gray300'
  },
  '&.active': {
    bg: '$primaryLight'
  }
})

interface IQuestionFilterProps {
  useQuestions: (searchTerm:IQuestionFilter, filter:string|null) => & APIStats<IQuestion[]>;
  questionLister: (questionStats: APIStats<IQuestion[]>) => ReactNode | ReactNode[];
}

export default function QuestionFilter({ useQuestions, questionLister } : IQuestionFilterProps) {
  const [searchTerm, setSearchTerm] = useState<string|null>(null);
  const [filter, setFilter] = useState<IQuestionFilter>('new');
  const stats = useQuestions(filter, searchTerm);

  return (
    // some real nice ui
    <>
    <Input
      type="search"
      underlined
      placeholder="جست‌وجو"
      contentRight={<IconButton><FontAwesomeIcon icon={faSearch} style={{color:'gray'}} /></IconButton>}
      onKeyDown={(e)=>{
        if (e.key == "Enter")
          setSearchTerm(e.currentTarget.value);
      }}
    />
    <FilterBox>
      {([
          { key: 'new', text: 'جدید'},
          { key: 'top', text: 'محبوب'},
          { key: 'controversial', text: 'بحث برانگیز'},
        ] as Array<{key: IQuestionFilter, text:string}>).map(obj => (
          <FilterOption
            key={obj.key}
            className={filter == obj.key ? 'active' : ''}
            onClick={()=>setFilter(obj.key)}
          >
            {obj.text}
          </FilterOption>
        ))
      }
    </FilterBox>
    {questionLister(stats)}
    </>
  )
}