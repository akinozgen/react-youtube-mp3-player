import React, { useContext } from 'react';
import Store from '../../context';

export default function PlaylistItem(pls) {
  const { state, dispatch } = useContext(Store);

  function remove() {
    const playlistItem = state.playlists[pls.playlistIndex];
    playlistItem.items = playlistItem.items.filter((_, i) => i !== pls.index);

    dispatch({ type: 'updatePlaylists', payload: [...state.playlists.filter(_ => _.name !== playlistItem.name), playlistItem] });
  }

  return <li className="list-group-item">
    <span>{pls.snippet.title}</span>
    <span>
      <button className="btn btn-transparent btn-sm" onClick={remove}>
        <i className="fa fa-times"></i>
      </button>
    </span>
  </li>;
}
