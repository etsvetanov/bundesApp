import { combineReducers } from 'redux';

import { match } from './match';
import { team } from './team';


const rootReducer = combineReducers({
   match,
   team,
});

export default rootReducer;