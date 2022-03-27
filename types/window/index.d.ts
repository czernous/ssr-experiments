export {};

declare global {
    interface Window {
        __PRELOADED_STATE__: any;
    }
}

//window.__PRELOADED_STATE__ = window.__PRELOADED_STATE__ || {};
