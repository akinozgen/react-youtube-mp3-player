import React from 'react';

const Store = React.createContext({
  playlists: [],
  queue: [],
  search_query: '',
  search_results: [],
  current_song: null,
  is_playing: false,
  queue_position: 0,
  current_song_url: 'https://raw.githubusercontent.com/anars/blank-audio/master/5-seconds-of-silence.mp3',
  progress: 0
});

export default Store;