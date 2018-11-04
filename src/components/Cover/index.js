import React, { useContext, useState } from 'react';
import Store from '../../context';

export default function Cover() {
  const { state } = useContext(Store);

  function getCover(item) {
    if (item !== null)
      return item.snippet.thumbnails.high.url;
    else
      return 'http://placehold.it/1600x900?text=Not Playing';
  }

  return <div className="cover">
    <img src={getCover(state.current_song)} alt="/" />
  </div>;
}