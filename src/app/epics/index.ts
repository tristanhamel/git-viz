import { createEpicMiddleware } from 'redux-observable';

import { RepositoriesEpics } from './repositories.epics';
import { UsersEpics } from './user.epics';
import { WatchEventsEpics } from './watch-events.epics';

export const epics = [
  RepositoriesEpics,
  UsersEpics,
  WatchEventsEpics
];

export const epicsMiddleware = [
  createEpicMiddleware(this.watchEvents.get),
  createEpicMiddleware(this.repositories.getDetails),
  createEpicMiddleware(this.users.getToken)
];
