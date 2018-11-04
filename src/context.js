import React from 'react';

const Store = React.createContext({
  playlists: [],
  queue: [],
  search_query: '',
  search_results: [],
  current_song: null,
  is_playing: false,
  queue_position: 0
});

export default Store;