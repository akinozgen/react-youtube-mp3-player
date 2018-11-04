import React, { Component, useContext, useReducer } from 'react';

import Store from './context';
import reducer from './reducer';

import { usePersistedContext, usePersistedReducer } from './usePersist';

import { Player } from './components/Player';
import Container from './components/Container';

function App() {
  const globalStore = usePersistedContext(useContext(Store), 'state');

  const [state, dispatch] = usePersistedReducer(
    useReducer(reducer, globalStore),
    'state'
  );

  return <Store.Provider>
    <Container>
      <Player />
    </Container>
  </Store.Provider>
}

export default App;