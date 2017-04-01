import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import { rootReducer, IAppState } from './reducers';

import { AppComponent } from './app.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { WatchEventsActions } from './actions/watch-events.actions';
import { WatchEventsEpics } from './epics/watch-events.epics';

@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule
  ],
  providers: [
    WatchEventsActions,
    WatchEventsEpics
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<{}>, devTools:DevToolsExtension, private epics: WatchEventsEpics) {
    const epicsMiddleware = [
      createEpicMiddleware(this.epics.get)
    ];
    ngRedux.configureStore(rootReducer, {}, epicsMiddleware, [ devTools.enhancer() ]);
  }
}
