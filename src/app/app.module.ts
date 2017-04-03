import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { createEpicMiddleware } from 'redux-observable';
import persistState from 'redux-localstorage'
import { rootReducer, IAppState } from './reducers';

import { GhAuthModule } from './modules/gh-auth/gh-auth.module';

import { AppComponent } from './app.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';

import { WatchEventsActions } from './actions/watch-events.actions';
import { UserActions } from './actions/user.actions';

import { WatchEventsEpics } from './epics/watch-events.epics';
import { RepositoriesEpics } from './epics/repositories.epics';
import { UsersEpics } from './epics/user.epics';

@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,

    GhAuthModule
  ],
  providers: [
    UserActions,
    WatchEventsActions,

    WatchEventsEpics,
    RepositoriesEpics,
    UsersEpics
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<{}>,
              devTools:DevToolsExtension,
              private watchEvents: WatchEventsEpics,
              private repositories: RepositoriesEpics,
              private users: UsersEpics
  ) {
    const epicsMiddleware = [
      createEpicMiddleware(this.watchEvents.get),
      createEpicMiddleware(this.repositories.getDetails),
      createEpicMiddleware(this.users.getToken)
    ];

    // state paths to persist in local storage
    const paths = ['user', 'repositories'];

    const persistStateConfig = {
      key: 'gvState',
      merge: (initialState, persistedState) => {
        // repositories are invalidated if they were updated more than 24 hours ago
        return Object.keys(persistedState)
          .reduce((finalState, key) => {
            if(paths.indexOf(key) === -1) {
              return finalState;
            }

            if(key === 'repositories' && persistedState.lastUpdated < Date.now() - 24*60*60*1000) {
              finalState[key] = initialState.repositories;
            } else {
              finalState[key] = persistedState[key];
            }

            return finalState;
          }, initialState);
      }
    };

    const enhancers = [
      persistState(),
      devTools.enhancer(persistStateConfig)
    ];

    ngRedux.configureStore(rootReducer, {}, epicsMiddleware, enhancers);
  }
}
