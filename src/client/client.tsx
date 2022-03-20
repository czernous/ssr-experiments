import { hydrate } from 'inferno-hydrate';
import { BrowserRouter } from "inferno-router";
import { Provider } from 'inferno-redux';
import App from './app';
import { store } from '../store';
// @ts-ignore
delete window.__PRELOADED_STATE__

hydrate(
    <Provider store={store}>
        <BrowserRouter><App /></BrowserRouter>
    </Provider>, document.getElementById('root'));