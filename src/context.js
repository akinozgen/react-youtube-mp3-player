import React from 'react';

const Store = React.createContext({
  playlists: [],
  queue: [],
  search_query: '',
  search_results: [],
  current_song: null
});

export default Store;