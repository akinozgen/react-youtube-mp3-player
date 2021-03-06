import React, { useContext } from 'react';
import Store from '../../context';

export default function Item(searchResult) {
  const { state, dispatch } = useContext(Store);

  const { title } = searchResult.snippet;
  const { videoId } = searchResult.id;

  function onClick(id) {
    const queue = [...state.queue, state.search_results.filter(_ => _.id.videoId === id)[0]];
    dispatch({ type: 'updateQueue', payload: queue });
  }

  return <div className="list-group-item">
    <span>
      <button className="btn btn-transparent btn-sm" onClick={_ => onClick(videoId)}>
        <i className="fa fa-plus"></i>
      </button>
    </span>
    <span>
      {title}
    </span>
  </div>;
}