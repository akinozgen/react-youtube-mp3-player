import React from 'react';

export default function PlaylistManager() {
  return <ul className="list-group playlist-content tab-pane fade" id="playlist" role="tabpanel" aria-labelledby="playlist-tab">
    <li className="list-group-item">
      <span>
        Playlist #1
  </span>
      <span>
        <button className="btn btn-transparent btn-sm">
          <i className="fa fa-times"></i>
        </button>
        <button className="btn btn-transparent btn-sm">
          <i className="fa fa-chevron-down"></i>
        </button>
      </span>
      <span className="playlist-content">
        <ul className="list-group">
          <li className="list-group-item">
            <span>
              The Dø | A Take Away Show
        </span>
            <span>
              <button className="btn btn-transparent btn-sm">
                <i className="fa fa-times"></i>
              </button>
            </span>
          </li>
          <li className="list-group-item">
            <span>The Cranberries - Promises</span>
            <span>
              <button className="btn btn-transparent btn-sm">
                <i className="fa fa-times"></i>
              </button>
            </span>
          </li>
        </ul>
      </span>
    </li>
  </ul>;
}