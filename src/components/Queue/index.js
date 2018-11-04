import React from 'react';

export default function Queue() {
  return <ul className="list-group playlist-content tab-pane fade show active" id="queue" role="tabpanel" aria-labelledby="queue-tab">
    <li className="list-group-item">
      <span>
        <button className="btn btn-transparent btn-sm drag-handle">
          <i className="fa fa-grip-vertical"></i>
        </button>
      </span>
      <span>
        The Dø - Despair, Hangover & Ecstasy
      </span>
      <span>
        <button className="btn btn-transparent btn-sm">
          <i className="fa fa-times"></i>
        </button>
      </span>
    </li>
  </ul>;
}