import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import persistState from 'redux-localstorage';

import { actions } from './actions';
import { epics, epicsMiddleware } from './epics';
import { rootReducer } from './reducers';

@NgModule({
  providers: [
    ...actions,
    ...epics
  ],
  imports: [
    NgReduxModule
  ]
})
export class StoreModule {
 constructor(private ngRedux: NgRedux<{}>,
             private devToolsExtension: DevToolsExtension) {
   const initialState = {};

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
     persistState(persistStateConfig),
     this.devToolsExtension.enhancer()
   ];

   ngRedux.configureStore(rootReducer, initialState, middleWare, enhancers);
 }
}
