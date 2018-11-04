import React, { useContext } from 'react';
import Store from '../../context';

export function getTitle(item) {
  return item !== null ? item.snippet.title : 'Not Playing';
};

export default function Meta() {
  const { state } = useContext(Store);

  return <div className="meta">
    <div className="seekbar">
      <div className="progress">
        <div className="progress-bar" role="progressbar" style={{ width: '20%' }} aria-valuenow="20" aria-valuemin="0"
          aria-valuemax="100"></div>
      </div>
    </div>
    <div className="title">
      {getTitle(state.current_song)}
    </div>
  </div>;
}