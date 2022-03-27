import { combineReducers } from '@reduxjs/toolkit';

import {counterReducer} from './counter';

const rootReducer = combineReducers({
  beers: counterReducer,
});

export default rootReducer;