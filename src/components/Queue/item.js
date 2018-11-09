import React, { useContext } from 'react';
import Store from '../../context';
import API_CONFIG from '../../ApiConfig';

export default function Item(item) {
  const { state, dispatch } = useContext(Store);

  const current = item.index === state.queue_position;

  function remove() {
    const newQueue = state.queue.filter((_, i) => i !== item.index);
    dispatch({ type: 'updateQueue', payload: newQueue })

    if (newQueue.length === 0) {
      dispatch({ type: 'updateCurrentSong', payload: null });
      dispatch({ type: 'updateIsPlaying', payload: 0 });
      dispatch({ type: 'updateQueuePosition', payload: 0 });
    }
  }

  function play() {
    dispatch({ type: 'updateQueuePosition', payload: item.index });
    dispatch({ type: 'updateCurrentSong', payload: state.queue.filter((_, i) => i === item.index)[0] });
    dispatch({ type: 'updateCurrentSongUrl', payload: API_CONFIG.yt_mp3_endpoint({ videoId: item.id.videoId }) });
    dispatch({ type: 'updateIsPlaying', payload: true });
  }

  return <li className={`list-group-item ${current ? 'active' : ''}`} onDoubleClick={play}>
    <span>
      {item.children}
    </span>
    <span>
      {item.snippet.title}
    </span>
    <span>
      <button className="btn btn-transparent btn-sm" onClick={remove}>
        <i className="fa fa-times"></i>
      </button>
    </span>
  </li>;
}
