import React, { useContext } from 'react';
import Store from '../../context';
import Item from './item';

export default function PlaylistManager() {
  const { state } = useContext(Store);

  return <ul className="list-group playlist-content tab-pane fade" id="playlist" role="tabpanel" aria-labelledby="playlist-tab">
    {state.playlists.map((pls, index) => <Item key={index} index={index} {...pls} />)}
  </ul>;
}
