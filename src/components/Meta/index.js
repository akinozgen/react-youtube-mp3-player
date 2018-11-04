import React from 'react';

export default function Meta() {
  return <div className="meta">
    <div className="seekbar">
      <div className="progress">
        <div className="progress-bar" role="progressbar" style={{ width: '20%' }} aria-valuenow="20" aria-valuemin="0"
          aria-valuemax="100"></div>
      </div>
    </div>
    <div className="title">
      The Dø | A Take Away Show
  </div>
  </div>;
}