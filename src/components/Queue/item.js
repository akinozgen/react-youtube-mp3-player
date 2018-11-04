import React, { useContext } from 'react';
import Store from '../../context';

export default function Item(item) {
  const { state, dispatch } = useContext(Store);

  const { queue_position } = state;
  const current = item.index === queue_position;

  function remove() {
    const newQueue = state.queue.filter((_, i) => i !== item.index);
    dispatch({ type: 'updateQueue', payload: newQueue })

    if (newQueue.length === 0) {
      dispatch({ type: 'updateCurrentSong', payload: null });
      dispatch({ type: 'updateIsPlaying', payload: 0 });
      dispatch({ type: 'updateQueuePosition', payload: 0 });
    }
  }

  return <li className={`list-group-item ${current ? 'active' : ''}`}>
    <span>
      <button className="btn btn-transparent btn-sm drag-handle">
        <i className="fa fa-grip-vertical"></i>
      </button>
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