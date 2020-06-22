import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routing from './components/Routing';
import { BrowserRouter as Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import JavascriptTimeAgo from 'javascript-time-ago'
 
import en from 'javascript-time-ago/locale/en'
JavascriptTimeAgo.addLocale(en)

const history = createHistory()

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Routing />
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
