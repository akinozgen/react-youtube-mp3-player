# YTMP3 (YouTube MP3 Player)

MP3 Player powered with youtube database. 

Play videos as audio from youtube. Create queue, save queues as playlists. Export and share playlists, import shared playlists and more... 

<div align="center">
  
<img src="https://github.com/akinozgen/react-youtube-mp3-player/blob/master/ss/ssmobile.png?raw=true" alt="YTMP3 (YouTube MP3 Player)" />
  
</div>


## Install Instructions

### For Server
1. Clone this repo
2. Run `git submodule update --init --recursive`
3. Cd into `ytmp3-node`
4. Run `npm install` or `yarn` to install dependencies
5. Run `npm start` or `yarn start` to start youtube to mp3 server

### For Client
1. Cd into this projects directory and run `npm install` or `yarn` to install dependencies.
2. Run this command to create your api config `cp src/ApiConfig.example.js src/ApiConfig.js`
3. Edit your `src/ApiConfig.js`. Enter your YouTube Data API key to `yt_api_key` property.
4. Edit your `yt_mp3_endpoint` url to the servers url you just configured above.
4. Run `npm start` or `yarn start` to start application
5. Search any song you want from the search panel and add to your queue. If everything is correct then it will start playing automatically.

--------

* ## Table Of Contents
  * [Building](#build-from-source)
   * [Demo](#checkout-demo)
   * [Development](#development)
   * [React Hooks](#react-hooks)
   * [Persistent Storage](#persistent-storage)
   * [State Structure](#state-structure)
   * [Reducers](#reducers)
   * [Gluing Together](#gluing-together)
    * [Deep Dive](#deep-diving)
      * [Components](#1-components)
        * [Container](#container)
        * [Player](#player)
        * [Cover](#cover)
        * [Meta](#meta)
        * [Controls](#controls)
        * [Playlist Manager](#playlist-manager)
        * [Queue](#queue)
        * [Search](#search)
      * [Out of Context Components](#outside-of-the-context-components)
        * [API Config](#api-config)
      
## Build from source

* Clone Repo:
```
$ git clone https://github.com/akinozgen/ytmp3
```
* Install Dependencies:
```
$ yarn
```
or
```
$ npm install
```
* Build:
```
$ yarn build
```
or
```
$ npm run build
```

### Checkout demo
[🔱 Click To See Demo](http://yt-mp3.surge.sh/)


### Development
#### React Hooks
[🔱file ](https://reactjs.org/docs/hooks-intro.html)
> Hooks are a new feature proposal that lets you use state and other React features without writing a class.

----------
#### Persistent Storage
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/usePersist.js) 

This app uses browsers `localStorage` as persistent storage. In further updates, it will use firebase realtime database for storing data. With firebase authentication and storage, this will be a social music player. 


```javascript
// ref. https://codesandbox.io/s/qz9wrzry44
//      https://codesandbox.io/u/f

import { useEffect } from 'react';

export function usePersistedContext(context, key = 'state') {
  const persistedContext = localStorage.getItem(key);

  return persistedContext ? JSON.parse(persistedContext) : context;
}

export function usePersistedReducer([state, dispatch], key = 'state') {
  useEffect(_ => localStorage.setItem(key, JSON.stringify(state)), [state]);

  return [state, dispatch];
}
```
----------

#### State Structure
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/context.js)

Initial state structure looks like this. Every possible variable defined with their default values so lifecycle can't get broken because of empty state variables etc. 

```javascript
import React from 'react';

const Store = React.createContext({
  playlists: [],
  queue: [],
  search_query: '',
  search_results: [],
  current_song: null,
  is_playing: false,
  queue_position: 0,
  current_song_url: 'https://raw.githubusercontent.com/anars/blank-audio/master/5-seconds-of-silence.mp3',
  progress: 0
});

export default Store;
```

--------
#### Reducers
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/reducer.js)

All reducers does the same work. They take original state and modified variable, spread original state and replace given variable at the end of the object.

```javascript
export default function reducer(state, action) {
  let newState = state;

  switch (action.type) {
    case 'updatePlaylists':
      newState = { ...state, playlists: action.payload }
      break;
      ...
      ...
  } // end-switch

  return newState;
}

```

----------
#### Gluing Together
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/App.js)

In app function (component), registering state to localStorage as i mentioned before and wraps applications main component with store provider.

```javascript
import React, { useContext, useReducer } from 'react';
import Store from './context';
import reducer from './reducer';
import { usePersistedContext, usePersistedReducer } from './usePersist';
...
...

function App() {
  const globalStore = usePersistedContext(useContext(Store), 'state');

  const [state, dispatch] = usePersistedReducer(
    useReducer(reducer, globalStore),
    'state'
  );

  return (<Store.Provider value={{ state, dispatch }}>
    <Container>
      <Player />
    </Container>
  </Store.Provider>);
}

export default App;
```

### Deep Diving
#### 1. Components
##### Container
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/components/Container/index.js)

Just a basic container div for wrapping application context.

```javascript
import React from 'react';

const Container = _ => <div className="container">{_.children}</div>;

export default Container;
```
##### Player
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/components/Player/index.js)

Player component used for getting every dynamic components together. For tab view i used bootstraps tab panel component with jquery.

```javascript
import React from 'react';

import Cover from '../Cover';
...

export function Player() {
  return <div ...>
    <div ...>
      <Cover />
      <Meta />
      <Controls />
    </div>

    <div...>
      <div...>
        <div...>
          ...
        </div>
        <div...>
          <Queue />
          <PlaylistManager />
          <Search />
        </div>
      </div>
    </div>
  </div>;
}
```

##### Cover
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/components/Cover/index.js)

Cover component shows cover of video. Just this.

```javascript
import React, { useContext } from 'react';
import Store from '../../context';

export default function Cover() {
  const { state } = useContext(Store);

  function getCover(item) {
    if (item !== null) return item.snippet.thumbnails.high.url;
      ...
  }

  return <div className="cover">
    <img src={getCover(state.current_song)} />
  </div>;
}
```

##### Meta
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/components/Meta/index.js)

Meta components show title of video and current player duration. Duration value comes from state so component don't have to mess with outside dom elements.
`getTitle` function exported because of further usings.

```javascript
import React, { useContext } from 'react';
import Store from '../../context';

export function getTitle(item) {
  return item !== null ? item.snippet.title : 'Not Playing';
};

export default function Meta() {
  const { state } = useContext(Store);

  return <div...>
    <div...>
      <div...>
        <div className="progress-bar"...></div>
      </div>
    </div>
    <div...>
      {getTitle(state.current_song)}
    </div>
  </div>;
}
```

##### Controls
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/components/Controls/index.js)

Controls does every single player based functions. Play, pause, forward, backward, clear, save, shuffle etc. 

```javascript
import React, { useContext } from 'react';
import Store from '../../context';
import API_CONFIG from '../../ApiConfig';

export function array_shuffle(o) {
  return o.sort(function () { return 0.5 - Math.random() });
};

export default function Controls() {
  const { state, dispatch } = useContext(Store);

  function changePlayStatus() {
    ...
  }

  function onTimeUpdate(_) {
    ...
  }

  function changeQueuePosition(newPosition) {
    ...
  }

  function play(position = null) {
    ...
  }

  function pause() {
    ...
  }

  function backward() {
    ...
  }

  function forward() {
    ...
  }

  function shuffle() {
    ...
  }

  function volumeChange() {
    ...
  }

  function save() {
    ...
  }

  function clear() {
    ...
  }

  function onLoadError(_) {
    ...
  }

  return <div...>
    <audio
      src={state.current_song_url}
      ref={_ => window.audioPlayer = _}
      autoPlay
      onEnded={forward}
      onPaused={pause}
      onStarted={play}
      onLoadStart={_ => {
        _.target.ontimeupdate = onTimeUpdate;
        _.target.onerror = onLoadError;
      }}>
    <button ... onClick={save}>
    <button ... onClick={shuffle}>
    <button ... onClick={backward}>
    <button ... onClick={changePlayStatus}>
    <button ... onClick={forward}>
    <button ... onClick={volumeChange}>
    <button ... onClick={clear}>
  </div >;
}

```

##### Playlist Manager
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/components/PlaylistManager/index.js)

Playlist manager takes playlist data from state and renders as a list. Every list item has sub-list group with song list items. 

```javascript
import React, { useContext } from 'react';
import Store from '../../context';
import Item from './item';

export default function PlaylistManager() {
  const { state } = useContext(Store);

  return <ul className="list-group playlist-content tab-pane fade" id="playlist" role="tabpanel" aria-labelledby="playlist-tab">
    {state.playlists.map((pls, index) => <Item key={index} index={index} {...pls} />)}
  </ul>;
}
```

##### Queue
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/components/Queue/index.js)

Queue is a queue manager. It takes queue items from store renders them with a drag handle. `onSortEnd` function takes old index of dragged object, new index of dragged object and queue from state. Changes dragged items index with new index and saves to store.

> it has some issues with re-arranging current song. 

```javascript
import React, { useContext } from 'react';
import { ... } from 'react-sortable-hoc';

import Store from '../../context';
import Item from './item';
import Handle from './handle';

export default function Queue() {
  const { state, dispatch } = useContext(Store);

  const DragHandle = SortableHandle(() => <Handle />);

  const SortableItem = SortableElement(({value, ind}) => {
    return <Item index={ind} {...value}>
      <DragHandle />
    </Item>;
  });

  const SortableList = SortableContainer(({items}) => {
    return <ul...>
      {items.map((item, index) => <SortableItem key={index} ind={index} index={index} value={item} />)}
    </ul>;
  });

  function onSortEnd({oldIndex, newIndex}) {
    ...
  }

  return <SortableList getContainer={() => document.querySelector('.tab-content')} items={state.queue} useDragHandle={true} onSortEnd={onSortEnd} />;
}
```

##### Search
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/components/Search/index.js)

Search component searchs and lists result as a list group. Also search item sub component has add to queue option. Search query and results are stored to `localStorage`.

```javascript
import React, { useContext, useState } from 'react';
import Store from '../../context';

...

export default function Search() {
  const { state, dispatch } = useContext(Store);

  const [searchResults, setSearchResults] = useState(state.search_results || []);
  const [searchQuery, setSearchQuery] = useState(state.search_query || '');

  function handleSearchQueryChange(e) {
    ...
  }

  async function handleSearch() {
    ...
  }

  function handleSubmit(e) {
    ...
  }

  return <div...>
    <div...>
      <div...>
        <input...>
      {searchResults.map(result => <Item {...result} />)}
    </div>
  </div>;
}
```

-----------

#### Outside of the context components

##### Api Config
[🔱 file](https://github.com/akinozgen/ytmp3/blob/master/src/ApiConfig.js)

Api config gives api endpoints with function calls

```javascript
const API_CONFIG = {
  yt_api_key: 'YOUTUBE_SEARCH_API_KEY',
  yt_search_endpoint: _ => `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${_.searchQuery}&key=${API_CONFIG.yt_api_key}`,
  yt_video_info_endpoint: _ => `https://www.googleapis.com/youtube/v3/videos?id=${_.videoId}&part=contentDetails&key=${API_CONFIG.yt_api_key}`,
  yt_mp3_endpoint: _ => `http://159.65.167.192:8080/get-mp3/${_.videoId}`,
};

export default API_CONFIG;
```

