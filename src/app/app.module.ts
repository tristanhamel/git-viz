import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, IAppState } from './reducers';

import { GhAuthModule } from './modules/gh-auth/gh-auth.module';

import { AppComponent } from './app.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { WatchEventsActions } from './actions/watch-events.actions';
import { WatchEventsEpics } from './epics/watch-events.epics';
import { RepositoriesEpics } from './epics/repositories.epics';

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

    WatchEventsActions,
    WatchEventsEpics,
    RepositoriesEpics
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<{}>,
              devTools:DevToolsExtension,
              private watchEvents: WatchEventsEpics,
              private repositories: RepositoriesEpics
  ) {
    const epicsMiddleware = [
      createEpicMiddleware(this.watchEvents.get),
      createEpicMiddleware(this.repositories.getDetails)
    ];
    ngRedux.configureStore(rootReducer, {}, epicsMiddleware, [ devTools.enhancer() ]);
  }
}
