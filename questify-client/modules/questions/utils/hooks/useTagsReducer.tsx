import { useReducer } from 'react';

// :Q: maybe we can make this mechanism shared across the filtering system and post publish modal?

interface ITagReducerActions {
  add: (value: string) => void;
  remove: (value: string) => void;
}

export function useValueList(): readonly [values: string[], api: ITagReducerActions] {
  const [values, dispatch] = useReducer<(state: string[], action: { type: 'add' | 'remove'; payload: string; }) => string[]>(
    (state, action) => {
      switch (action.type) {
        case "add":
          if (state.includes(action.payload))
            return state;
          return [...state, action.payload];
        case "remove":
          return state.filter(t => t != action.payload);
      }
    },
    []
  );

  return [values, {
    add(tag: string) {
      dispatch({ type: 'add', payload: tag });
    },
    remove(tag: string) {
      dispatch({ type: 'remove', payload: tag });
    }
  }] as const;
}
