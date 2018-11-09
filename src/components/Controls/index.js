import React, { useContext } from 'react';
import Store from '../../context';
import API_CONFIG from '../../ApiConfig';

export function array_shuffle(o) {
  return o.sort(function () { return 0.5 - Math.random() });
};

export default function Controls() {
  const { state, dispatch } = useContext(Store);

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
    dispatch({ type: 'updateQueuePosition', payload: newPosition });
    // dispatch({ type: 'updateCurrentSong', payload: state.queue[newPosition] });
    play(newPosition);
  }

  function play(position = null) {
    const currentSong = state.queue[position !== null ? position : state.queue_position];
    const newAudioUrl = API_CONFIG.yt_mp3_endpoint({ videoId: currentSong.id.videoId });

    dispatch({ type: 'updateCurrentSong', payload: currentSong });
    dispatch({ type: 'updateIsPlaying', payload: true });
    dispatch({ type: 'updateCurrentSongUrl', payload: newAudioUrl });

    if (typeof window.audioPlayer === 'object' && window.audioPlayer.src !== newAudioUrl)
      window.audioPlayer.src = state.current_song_url;

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
    changeQueuePosition(state.queue_position === 0 ? state.queue.length - 1 : state.queue_position - 1);
  }

  function forward() {
    if (state.queue.length === 0) return;
    changeQueuePosition(state.queue_position === state.queue.length - 1 ? 0 : state.queue_position + 1);
  }

  function shuffle() {
    if (state.queue.length === 0) return;

    const beforeCurrent = state.queue.slice(0, state.queue_position);
    const afterCurrent = state.queue.slice(state.queue_position + 1, state.queue.length);

    const newQueue = [...beforeCurrent, state.current_song, ...array_shuffle(afterCurrent)];
    dispatch({ type: 'shuffleQueue', payload: newQueue });
  }

  function volumeChange() {
    const volume = window.audioPlayer.volume;
    if (volume === 1) window.audioPlayer.volume = (0.5);
    else if (volume === 0.5) window.audioPlayer.volume = (0);
    else if (volume === 0) window.audioPlayer.volume = (1);
    else window.audioPlayer.volume = (1);
  }

  function save() {
    const playlistName = prompt('Playlist Name: ', 'My Default Playlist');
    const playlist = { name: playlistName, items: state.queue };

    if (!(playlist.name.length >= 2))
      return;

    dispatch({ type: 'updatePlaylists', payload: [...state.playlists, playlist] });
  }

  function clear() {
    dispatch({ type: 'updateQueue', payload: [] });
    dispatch({ type: 'updateIsPlaying', payload: false });
    dispatch({ type: 'updateCurrentSong', payload: null });
    dispatch({ type: 'updateCurrentSongUrl', payload: null });
    dispatch({ type: 'updateQueuePosition', payload: 0 });
    dispatch({ type: 'updateProgress', payload: 0 });
  }

  function onLoadError(_) {
    if (_.target.error.code === 4) {
      forward();
    }
  }

  return <div className="controls">
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
    <button className="btn btn-transparent control-button playlist-action text-white" onClick={volumeChange}>
      <i className="fa fa-volume-up"></i>
    </button>
    <button className="btn btn-transparent control-button playlist-action text-white" onClick={clear}>
      <i className="fa fa-trash"></i>
    </button>
  </div >;
}
