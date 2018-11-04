import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();

// TODO: List group text wraps to be fixed
// TODO: Forward & Backward error when queue empty to be fixed
// TODO: Get mp3 url of current song when play triggered
// TODO: Play audio with <audio> to be implemented
// TODO: <audio> onprogress -> Progressbar,
//               play button -> play, pause,
//               forward, backward -> change src
//               onfinish -> forward & (on last queue item -> goto first)
//               is_repeat(1) -> !forward