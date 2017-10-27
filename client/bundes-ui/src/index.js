import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
