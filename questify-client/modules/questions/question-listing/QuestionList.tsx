// a very large, well-defined component allowing you to list, filter and render questions

import { APIStats } from "@utils/api-stats.interface";
import { Grid, Input } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useState } from "react";
import { IQuestionWD, ITag } from "../entities";
import { useTagsReducer } from "../utils";
import { CategoryBox } from "./category-filter";
import QuestionListLayout from "./QuestionListLayout";
import TagFilterBox from './tag-filter/TagFilterBox';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "modules/app-ui";
import type { IQuestionListHookParams } from "./interfaces";

interface IQuestionListProps <TQuestion=IQuestionWD> {
  useQuestions: (filters: IQuestionListHookParams) => APIStats<TQuestion[]>;
  useTags: () => APIStats<ITag[]>;
  listRenderer: (stats: APIStats<TQuestion[]>) => ReactNode | ReactNode[];
  categories?: string[];
  searchEnabled?: boolean;
  tagFilterEnabled?: boolean;
  sideContentHead?: ReactNode | ReactNode[];
  sideContentEnd?: ReactNode | ReactNode[];
}


export default function QuestionList <TQuestion=IQuestionWD> ({
  useQuestions,
  useTags,
  listRenderer,
  categories=[],
  tagFilterEnabled=true,
  sideContentHead=<></>,
  sideContentEnd=<></>,
} : IQuestionListProps<TQuestion>) {


  const [category, setCategory] = useState<string>(categories[0] || '__DEFAULT__');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTags, { addTag, removeTag }] = useTagsReducer();
  const questionsStats = useQuestions({
    category,
    selectedTags,
    searchTerm
  })
  const tagsStats = useTags();

  return (
    <QuestionListLayout
      sideContent={
        <Grid css={{ mt: '$10' }}>
          {sideContentHead}
          {tagFilterEnabled &&
            <TagFilterBox
              tags={tagsStats.data || []}
              addTag={addTag}
              removeTag={removeTag}
              selectedTags={selectedTags}
            />
          }
          {sideContentEnd}
        </Grid>
      }
    >
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
      <CategoryBox
        categories={categories}
        onCategorySelected={c=>setCategory(c)}
        selectedCategory={category}
      />
      {listRenderer(questionsStats)}
    </QuestionListLayout>
  )

}