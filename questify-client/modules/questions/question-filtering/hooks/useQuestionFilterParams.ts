import { IQuestionFilter } from "modules/questions/entities";
import { useReducer } from "react";

interface IQuestionFilterParams {
  searchTerm: string | null;
  selectedTags: Array<string>;
  filter: IQuestionFilter;
}

interface IAction {
  type: 'set-search-term' | 'set-category' | 'add-tag' | 'remove-tag';
  payload: any;
}

export function useQuestionFilterParams() {
  return useReducer<
    (
      state: IQuestionFilterParams,
      action: IAction
    ) => IQuestionFilterParams
  >(
    (state, action) => {
      switch (action.type) {
        case "set-search-term":
          return {
            ...state,
            searchTerm: action.payload,
          };
        case "set-category":
          return {
            ...state,
            filter: action.payload,
          };
        case "add-tag":
          return {
            ...state,
            selectedTags: [...state.selectedTags, action.payload],
          };
        case "remove-tag":
          return {
            ...state,
            selectedTags: state.selectedTags.filter((t) => t != action.payload),
          };
        default:
          throw Error("command " + action.type + " does not exist");
      }
    },
    {
      searchTerm: null,
      selectedTags: [],
      filter: 'new',
    }
  );
}
