// a very large, well-defined component allowing you to list, filter and render questions

import { APIStats } from "@utils/api-stats.interface";
import { ReactNode } from "react";
import { IQuestion } from "../entities";

interface IQuestionListHookParams {
  category: string;
  selectedTags: string[];
  searchTerm: string;
}

interface IQuestionListProps {
  useQuestions: (filters: IQuestionListHookParams) => IQuestion[];
  listRenderer: (stats: APIStats<IQuestion[]>) => ReactNode | ReactNode[]
  categories?: string[];
  searchEnabled?: boolean;
  tagFilterEnabled?: boolean;
  sideContentHead?: ReactNode | ReactNode[];
  sideContentEnd: ReactNode | ReactNode[];
}


export default function QuestionList({} : IQuestionListProps) {

}