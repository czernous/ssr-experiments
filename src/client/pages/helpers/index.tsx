import { hydrate } from 'inferno-hydrate';
import { Action } from 'redux';
import { store } from '../../../store';
import Head from '../../components/Head';

export const hydrateHead = (pageAction: string) => {
    const head = document.querySelector('head');
    const action: Action = { type: pageAction };
    store.dispatch(action);
    const finalState = store.getState();
    if (head) hydrate(<Head data={finalState} />, head);
};
