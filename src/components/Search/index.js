import React from 'react';

export default function Search() {
  return <div className="playlist-content tab-pane fade" id="search" role="tabpanel" aria-labelledby="search-tab">
    <div className="list-group search-control">
      <div className="list-group-item search-field">
        <input type="text" className="form-control" placeholder="Search" />
      </div>
      <div className="list-group-item">
        <span>
          <button className="btn btn-transparent btn-sm">
            <i className="fa fa-plus"></i>
          </button>
        </span>
        <span>
          The Dø 'Slippery Slope' - Official video
    </span>
      </div>
    </div>
  </div>;
}