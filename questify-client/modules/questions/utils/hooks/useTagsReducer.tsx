import { useReducer } from 'react';

// :Q: maybe we can make this mechanism shared across the filtering system and post publish modal?
export function useTagsReducer() {
  const [tags, dispatch] = useReducer<(state: string[], action: { type: 'add-tag' | 'remove-tag'; payload: string; }) => string[]>(
    (state, action) => {
      switch (action.type) {
        case "add-tag":
          if (state.includes(action.payload))
            return state;
          return [...state, action.payload];
        case "remove-tag":
          return state.filter(t => t != action.payload);
      }
    },
    []
  );

  return [tags, {
    addTag(tag: string) {
      dispatch({ type: 'add-tag', payload: tag });
    },
    removeTag(tag: string) {
      dispatch({ type: 'remove-tag', payload: tag });
    }
  }] as const;
}
