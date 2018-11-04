import React from 'react';

import Cover from '../Cover';
import Meta from '../Meta';
import Controls from '../Controls';
import Queue from '../Queue';
import PlaylistManager from '../PlaylistManager';
import Search from '../Search';

export function Player() {
  return <div className="player">
    <div className="top">
      <Cover />

      <Meta />

      <Controls />
    </div>

    <div className="bottom">
      <div className="playlist">
        <div className="nav library-control" role="tablist">
          <button className="active" id="queue-tab" data-toggle="tab" href="#queue" role="tab" aria-controls="queue"
            aria-selected="true">
            <i className="fa fa-headphones"></i>{" "}
            Queue
        </button>
          <button id="playlist-tab" data-toggle="tab" href="#playlist" role="tab" aria-controls="playlist" aria-selected="false">
            <i className="fa fa-list"></i>{" "}
            Playlists
        </button>
          <button id="search-tab" data-toggle="tab" href="#search" role="tab" aria-controls="search" aria-selected="false">
            <i className="fa fa-search"></i>{" "}
            Search
        </button>
        </div>
        <div className="tab-content">
          <Queue />
          <PlaylistManager />
          <Search />
        </div>
      </div>
    </div>
  </div>;
}