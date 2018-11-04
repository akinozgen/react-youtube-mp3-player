import React, { useContext } from 'react';
import Store from '../../context';

import { getTitle } from '../Meta';

export default function Item(item) {
  const { state } = useContext(Store);

  const { queue_position } = state;
  const current = item.etag === state.queue[queue_position].etag;

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
      <button className="btn btn-transparent btn-sm">
        <i className="fa fa-times"></i>
      </button>
    </span>
  </li>;
}