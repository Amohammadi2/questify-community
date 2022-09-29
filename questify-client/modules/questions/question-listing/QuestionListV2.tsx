// a very large, well-defined component allowing you to list, filter and render questions

import { APIStats } from "@utils/api-stats.interface";
import { ReactNode, useState } from "react";
import { IQuestion, IQuestionFilter } from "../entities";

interface IQuestionListHookParams {
  category: string;
  selectedTags: string[];
  searchTerm: string;
}

interface IQuestionListProps {
  useQuestions: (filters: IQuestionListHookParams) => APIStats<IQuestion[]>;
  listRenderer: (stats: APIStats<IQuestion[]>) => ReactNode | ReactNode[];
  categories?: string[];
  searchEnabled?: boolean;
  tagFilterEnabled?: boolean;
  sideContentHead?: ReactNode | ReactNode[];
  sideContentEnd?: ReactNode | ReactNode[];
}


export default function QuestionList({
  useQuestions,
  listRenderer,
  categories=[],
  tagFilterEnabled=true,
  sideContentHead=<></>,
  sideContentEnd=<></>
} : IQuestionListProps) {


  const [category, setCategory] = useState<string>(categories[0] || '__DEFAULT__');
  const [selectedTags, setSelectedTags] = useState<string[]>()
  const { } = useQuestions()

}