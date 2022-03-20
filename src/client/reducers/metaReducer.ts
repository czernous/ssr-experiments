import { Action } from 'redux';
import routes from '../routes';

function getRoute(route: string) {
    const r = routes.find((r) => r.route === route);
    return r?.metaData;
}

const initialState = {
    pageTitle: 'test',
    metaDescription: 'test',
    metaKeywords: 'test',
};

export default function metaReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'GO_HOME': {
            return Object.assign({}, state, {
                ...getRoute('/'),
            });
        }
        case 'GO_ABOUT': {
            return Object.assign({}, state, {
                ...getRoute('/about'),
            });
        }
        default:
            return state;
    }
}
