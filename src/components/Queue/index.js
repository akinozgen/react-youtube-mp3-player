import React, { useState, useContext } from 'react';

import Store from '../../context';
import Item from './item';

export default function Queue() {
  const { state, dispatch } = useContext(Store);

  return <ul className="list-group playlist-content tab-pane fade show active" id="queue" role="tabpanel" aria-labelledby="queue-tab">
    {state.queue.map((item, index) => <div key={index}><Item {...item} /></div>)}
  </ul>;
}