import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, Input, Loading, styled } from "@nextui-org/react";
import { APIStats } from "@utils/api-stats.interface";
import { IconButton } from "modules/app-ui";
import { ReactNode, useState } from "react";
import { IQuestion, IQuestionFilter } from "../entities";
import QuestionPost from "./QuestionPost";

const QuestionContainer = styled('div', {
  px: '$10',
  py: '$5',
  d: 'flex',
  flexDirection: 'column',
  flexBasis: '100%',
  maxWidth: '650px',
  '@sm': {
    flexBasis: '70%'
  }
});


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

interface IQuestionListProps {
  useQuestions: (searchTerm:string|null, filter:IQuestionFilter) => & APIStats<IQuestion[]>;
  sideContent?: ReactNode | ReactNode[];
}

// Todo: define better interfaces for the data inside
export default function QuestionListContainer({ useQuestions, sideContent=<></> }: IQuestionListProps) {
  
  const [searchTerm, setSearchTerm] = useState<string|null>(null);
  const [filter, setFilter] = useState<IQuestionFilter>('new');
  const { data: questions, loading } = useQuestions(searchTerm || null, filter);
  
  return (
    <Grid.Container direction="row">
      <QuestionContainer>
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
        {
          !loading
            ? questions && questions.map(q => (
                <QuestionPost
                  title={q.title}
                  content={q.content}
                  score={q.score}
                  author={q.author}
                  tags={q.tags}
                  key={q.id}
                />
              ))
            : <Loading css={{ mt: '$15' }} />
        }
      </QuestionContainer>
      {sideContent}
    </Grid.Container>
  )
}