import React, { useContext, useState } from 'react';
import Store from '../../context';
import API_CONFIG from '../../api_config';

export function array_shuffle(o) {
  return o.sort(function () { return 0.5 - Math.random() });
};

export default function Controls() {
  const { state, dispatch } = useContext(Store);
  const [queuePosition, updateQueuePosition] = useState(state.queue_position || 0);
  const [audioUrl, updateAudioUrl] = useState(state.current_song_url);

  function changePlayStatus() {
    if (state.is_playing) pause();
    else if (state.queue.length !== 0) play();
    else alert('Queue is empty!');
  }

  function onTimeUpdate(_) {
    const totalTime = Math.floor(_.target.duration);
    const currentTime = Math.floor(_.target.currentTime);

    dispatch({ type: 'updateProgress', payload: Math.floor((currentTime / totalTime) * 100) });
  }

  function changeQueuePosition(newPosition) {
    updateQueuePosition(newPosition);
    dispatch({ type: 'updateQueuePosition', payload: newPosition });
    // dispatch({ type: 'updateCurrentSong', payload: state.queue[newPosition] });
    play(newPosition);
  }

  function play(position = null) {
    const currentSong = state.queue[position !== null ? position : queuePosition];
    const newAudioUrl = API_CONFIG.yt_mp3_endpoint({ videoId: currentSong.id.videoId });

    dispatch({ type: 'updateCurrentSong', payload: currentSong });
    dispatch({ type: 'updateIsPlaying', payload: true });
    dispatch({ type: 'updateCurrentSongUrl', payload: newAudioUrl });

    updateAudioUrl(newAudioUrl);

    if (typeof window.audioPlayer === 'object' && window.audioPlayer.src !== newAudioUrl)
      window.audioPlayer.src = audioUrl;

    if (typeof window.audioPlayer === 'object')
      window.audioPlayer.play();

    document.title = currentSong.snippet.title;
  }

  function pause() {
    dispatch({ type: 'updateIsPlaying', payload: false });
    window.audioPlayer.pause();
  }

  function backward() {
    if (state.queue.length === 0) return;
    changeQueuePosition(queuePosition === 0 ? state.queue.length - 1 : queuePosition - 1);
  }

  function forward() {
    if (state.queue.length === 0) return;
    changeQueuePosition(queuePosition === state.queue.length - 1 ? 0 : queuePosition + 1);
  }

  function shuffle() {
    if (state.queue.length === 0) return;

    const beforeCurrent = state.queue.slice(0, queuePosition);
    const afterCurrent = state.queue.slice(queuePosition + 1, state.queue.length);

    const newQueue = [...beforeCurrent, state.current_song, ...array_shuffle(afterCurrent)];
    dispatch({ type: 'shuffleQueue', payload: newQueue });
  }

  // eslint-disable-next-line
  function repeat() {
    // to be implemented
  }

  function save() {
    const playlistName = prompt('Playlist Name: ', 'My Default Playlist');
    const playlist = { name: playlistName, items: state.queue };

    dispatch({ type: 'updatePlaylists', payload: [...state.playlists, playlist] });
  }

  function clear() {
    dispatch({ type: 'updateQueue', payload: [] });
    dispatch({ type: 'updateIsPlaying', payload: false });
    dispatch({ type: 'updateCurrentSong', payload: null });
    dispatch({ type: 'updateQueuePosition', payload: 0 });
  }

  function onLoadError(_) {
    if (_.target.error.code === 4) {
      forward();
    }
  }

  return <div className="controls">
    <audio
      src={audioUrl}
      ref={_ => window.audioPlayer = _}
      autoPlay
      onEnded={forward}
      onLoadStart={_ => {
        _.target.ontimeupdate = onTimeUpdate;
        _.target.onerror = onLoadError;
      }}>
    </audio>
    <button className="btn btn-transparent control-button playlist-action text-white" onClick={save}>
      <i className="fa fa-save"></i>
    </button>
    <button className="btn btn-transparent control-button playlist-action text-white" onClick={shuffle}>
      <i className="fa fa-random"></i>
    </button>
    <button className="btn btn-warning control-button text-white" onClick={backward}>
      <i className="fa fa-backward"></i>
    </button>
    <button className="btn btn-warning control-button text-white play-button" onClick={changePlayStatus}>
      <i className={state.is_playing ? 'fa fa-pause' : 'fa fa-play'}></i>
    </button>
    <button className="btn btn-warning control-button text-white" onClick={forward}>
      <i className="fa fa-forward"></i>
    </button>
    <button className="btn btn-transparent control-button playlist-action text-white">
      <i className="fa fa-redo-alt"></i>
    </button>
    <button className="btn btn-transparent control-button playlist-action text-white" onClick={clear}>
      <i className="fa fa-trash"></i>
    </button>
  </div >;
}
