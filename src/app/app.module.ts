import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
// import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

interface IAppState { /* ... */ }

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools:DevToolsExtension) {
    ngRedux.configureStore(rootReducer, {}, [ thunk ], [ devTools.enhancer() ]);
  }
}
