import { combineReducers } from 'redux';

import { user, IUser } from './user.reducer';
import { watchEvents, IWatchEvents } from './watch-events.reducer';

export interface IAppState {
  user: IUser;
  watchEvents: IWatchEvents;
}

export const rootReducer = combineReducers({
  user,
  watchEvents
});
