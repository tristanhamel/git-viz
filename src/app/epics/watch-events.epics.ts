import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as actions from '../constants/ActionTypes';
import * as urls from '../constants/urls';

@Injectable()
export class WatchEventsEpics {
  constructor(private http: Http) {}

  get = (action$) => {
    return action$.ofType(actions.WATCH_EVENTS_GET)
      .mergeMap( ({payload}) =>
        this.http.get(`${urls.users}/${payload}/events`)
          .map(response => {
            const payload = response.json().filter(event => event.type === 'WatchEvent');
            return {type: actions.WATCH_EVENTS_GET_SUCCESS, payload };
          })
      );
  };
}
