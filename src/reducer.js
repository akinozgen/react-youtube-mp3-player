export default function reducer(state, action) {
  let newState = state;

  switch (action.type) {
    case 'updatePlaylists':
      newState = { ...state, playlists: action.payload }
      break;

    case 'updateCurrentSong':
      newState = {
        ...state,
        current_song: action.payload
      };
      break;

    case 'updateQueue':
      newState = {
        ...state,
        queue: action.payload
      };
      break;
    case 'shuffleQueue':
      newState = {
        ...state,
        queue: action.payload
      };
      break;

    case 'updateSearchResults':
      newState = {
        ...state,
        search_results: action.payload
      };
      break;

    case 'updateSearchQuery':
      newState = { ...state, search_query: action.payload };
      break;

    case 'updateIsPlaying':
      newState = { ...state, is_playing: action.payload }
      break;

    case 'updateQueuePosition':
      newState = { ...state, queue_position: action.payload };
      break;

    case 'updateCurrentSongUrl':
      newState = { ...state, current_song_url: action.payload };
      break;

    case 'updateProgress':
      newState = { ...state, progress: action.payload };
      break;

    default:

      break;
  } // end-switch

  return newState;
}
