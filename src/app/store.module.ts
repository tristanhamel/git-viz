import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import persistState from 'redux-localstorage';
import { createEpicMiddleware } from 'redux-observable';

import { actions } from './actions';

import { rootReducer } from './reducers';

import { WatchEventsEpics } from './epics/watch-events.epics';
import { RepositoriesEpics } from './epics/repositories.epics';
import { UsersEpics } from './epics/user.epics';

@NgModule({
  providers: [
    ...actions,
    WatchEventsEpics,
    RepositoriesEpics,
    UsersEpics
  ],
  imports: [
    NgReduxModule
  ]
})
export class StoreModule {
 constructor(private ngRedux: NgRedux<{}>,
             private devToolsExtension: DevToolsExtension,
             private watchEvents: WatchEventsEpics,
             private repositories: RepositoriesEpics,
             private users: UsersEpics) {
   const initialState = {};

   const epicsMiddleware = [
     createEpicMiddleware(this.watchEvents.get),
     createEpicMiddleware(this.repositories.getDetails),
     createEpicMiddleware(this.users.getToken)
   ];

   const middleWare = [
     ...epicsMiddleware
   ];

// state paths to persist in local storage
   const paths = ['user', 'repositories'];

   const persistStateConfig = {
     key: 'gvState',
     merge: (initialState, persistedState) => { // tslint:disable-line no-shadowed-variable
       // repositories are invalidated if they were updated more than 24 hours ago
       return Object.keys(persistedState)
         .reduce((finalState, key) => {
           if (paths.indexOf(key) === -1) {
             return finalState;
           }

           if (key === 'repositories' && persistedState.lastUpdated < Date.now() - 24 * 60 * 60 * 1000) {
             finalState[key] = initialState.repositories;
           } else {
             finalState[key] = persistedState[key];
           }

           return finalState;
         }, {});
     }
   };

   const enhancers = [
     persistState(paths, persistStateConfig),
     this.devToolsExtension.enhancer()
   ];

   ngRedux.configureStore(rootReducer, initialState, middleWare, enhancers);
 }
}
