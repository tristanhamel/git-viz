import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { WatchEventsActions } from '../actions/watch-events.actions';
import * as actions from '../constants/ActionTypes';
import * as urls from '../constants/urls';
// import { IAppState } from '../reducers/index'

@Injectable()
export class WatchEventsEpics {
  constructor(private http: Http) {}

  get = (action$) => {
    return action$.ofType(actions.WATCH_EVENTS_GET)
      .mergeMap( ({payload}) =>
        this.http.get(`${urls.users}/${payload}/events`)
          .map(response => ({type: actions.WATCH_EVENTS_GET_SUCCESS, payload: response.json()}))
      );
  }
}
