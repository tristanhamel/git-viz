import { combineReducers } from 'redux';

import { user, IUser } from './user.reducer';
import { watchEvents, IWatchEvents } from './watch-events.reducer';
import { repositories, IRepositories } from './repositories.reducer';

export interface IAppState {
  user: IUser;
  watchEvents: IWatchEvents;
  repositories: IRepositories;
}

export const rootReducer = combineReducers({
  user,
  watchEvents,
  repositories
});
