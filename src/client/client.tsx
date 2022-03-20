import { hydrate } from 'inferno-hydrate';
import { BrowserRouter } from 'inferno-router';
import { Provider } from 'inferno-redux';
import App from './app';
import { store } from '../store';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete window.__PRELOADED_STATE__;

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
