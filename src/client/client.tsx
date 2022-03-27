import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import App from './app'
import { Provider } from 'react-redux'

import {createStore} from '../redux/store';

declare var window: any;

const store = createStore(window.__STATE__);

delete window.__STATE__;

ReactDOM.hydrate(
    <Provider store={store}><BrowserRouter>
    <App />
</BrowserRouter></Provider>, document.getElementById('root'))