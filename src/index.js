import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();

// TODO: List group text wraps to be fixed
// TODO: <audio> is_repeat(1) -> !forward
// TODO: Move functions outside the components and export them
// TODO: Sort queue