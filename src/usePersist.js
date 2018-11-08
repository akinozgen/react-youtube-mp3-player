// ref. https://codesandbox.io/s/qz9wrzry44
//      https://codesandbox.io/u/f

import { useEffect } from 'react';

export function usePersistedContext(context, key = 'state') {
  const persistedContext = localStorage.getItem(key);

  return persistedContext ? JSON.parse(persistedContext) : context;
}

export function usePersistedReducer([state, dispatch], key = 'state') {
  useEffect(_ => localStorage.setItem(key, JSON.stringify(state)), [state]);

  return [state, dispatch];
}
