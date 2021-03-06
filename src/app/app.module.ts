import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';

import { StoreModule } from './reducers/store.module';

import { GvAuthModule } from './modules/gv-auth/gv-auth.module';

import { httpFactory } from './services/http-factory';
import { ReposSelector } from './services/repos.service';

import { AppComponent } from './app.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    StoreModule,
    GvAuthModule
  ],
  providers: [
    ReposSelector,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
