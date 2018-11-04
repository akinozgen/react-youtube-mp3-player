import React from 'react';

export default function Controls() {
  return <div className="controls">
    <button className="btn btn-transparent control-button playlist-action text-white">
      <i className="fa fa-save"></i>
    </button>
    <button className="btn btn-transparent control-button playlist-action text-white">
      <i className="fa fa-random"></i>
    </button>
    <button className="btn btn-warning control-button text-white">
      <i className="fa fa-backward"></i>
    </button>
    <button className="btn btn-warning control-button text-white play-button">
      <i className="fa fa-play"></i>
    </button>
    <button className="btn btn-warning control-button text-white">
      <i className="fa fa-forward"></i>
    </button>
    <button className="btn btn-transparent control-button playlist-action text-white">
      <i className="fa fa-redo-alt"></i>
    </button>
    <button className="btn btn-transparent control-button playlist-action text-white">
      <i className="fa fa-trash"></i>
    </button>
  </div>;
}