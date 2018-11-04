import React, { useState, useContext } from 'react';
import Store from '../../context';
import PlaylistItem from './playlist-item';

export default function Item(pls) {
  const { state, dispatch } = useContext(Store);
  const [expanded, toggleExpanded] = useState(false);

  function remove() {
    dispatch({ type: 'updatePlaylists', payload: state.playlists.filter((_, index) => index !== pls.index) });
  }

  function load() {
    dispatch({ type: 'updateQueue', payload: state.playlists[pls.index].items });
  }

  return <li className="list-group-item">
    <span>
      <button className="btn btn-transparent btn-sm" onClick={load}>
        <i className="fa fa-play"></i>
      </button>
    </span>
    <span>
      {pls.name}
    </span>
    <span>
      <button className="btn btn-transparent btn-sm" onClick={remove}>
        <i className="fa fa-times"></i>
      </button>
      <button className="btn btn-transparent btn-sm" onClick={_ => toggleExpanded(!expanded)}>
        <i className="fa fa-chevron-down"></i>
      </button>
    </span>
    <span className={`playlist-content ${expanded ? 'expanded' : ''}`}>
      <ul className="list-group">
        {pls.items.map((item, index) => <PlaylistItem key={index} index={index} playlistIndex={pls.index} {...item} />)}
      </ul>
    </span>
  </li>;
}

