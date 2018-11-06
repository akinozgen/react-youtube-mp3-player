import React, { useContext, useState } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from 'react-sortable-hoc';

import Store from '../../context';
import Item from './item';
import Handle from './handle';

export default function Queue() {
  const { state, dispatch } = useContext(Store);
  const [queue, updateQueue] = useState(state.queue);

  const DragHandle = SortableHandle(() => <Handle />);

  const SortableItem = SortableElement(({value, ind}) => {
    return <Item index={ind} {...value}>
      <DragHandle />
    </Item>;
  });

  const SortableList = SortableContainer(({items}) => {
    return <ul className="list-group playlist-content tab-pane fade show active" id="queue" role="tabpanel" aria-labelledby="queue-tab">
      {items.map((item, index) => <SortableItem key={index} ind={index} index={index} value={item} />)}
    </ul>;
  });

  function onSortEnd({oldIndex, newIndex}) {
    if (oldIndex === newIndex) return;
    const newQueue = arrayMove(queue, oldIndex, newIndex);
    let newQueuePosition = state.queue_position;

    if (oldIndex === newQueuePosition) {
      newQueuePosition = newIndex;
    } else if (oldIndex > newIndex && (newQueuePosition === newIndex || newQueuePosition === oldIndex)) {
      newQueuePosition++;
    } else  if (oldIndex < newIndex && (newQueuePosition === newIndex || newQueuePosition === oldIndex)) {
      newQueuePosition--;
    }

    dispatch({ type: 'updateQueue', payload: newQueue });
    dispatch({ type: 'updateQueuePosition', payload: newQueuePosition });

    updateQueue(newQueue)
  }

  return <SortableList getContainer={() => document.querySelector('.tab-content')} items={queue} useDragHandle={true} onSortEnd={onSortEnd} />;
}
