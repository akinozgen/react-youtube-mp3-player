export default function reducer(state, action) {

  switch (action.type) {
    case 'updatePlaylists':
      return { ...state, playlists: action.payload }
      break;

    case 'updateCurrentSong':
      return {
        ...state,
        current_song: action.payload
      };
      break;

    case 'updateQueue':
      return {
        ...state,
        queue: action.payload
      };
      break;
    case 'shuffleQueue':
      return {
        ...state,
        queue: action.payload
      };
      break;

    case 'updateSearchResults':
      return {
        ...state,
        search_results: action.payload
      };
      break;

    case 'updateSearchQuery':
      return { ...state, search_query: action.payload };
      break;

    case 'updateIsPlaying':
      return { ...state, is_playing: action.payload }
      break;

    case 'updateQueuePosition':
      return { ...state, queue_position: action.payload };
      break;

    case 'updateCurrentSongUrl':
      return { ...state, current_song_url: action.payload };
      break;

    case 'updateProgress':
      return { ...state, progress: action.payload };
      break;

    default:

      break;
  }


}