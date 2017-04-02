import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { WatchEventsActions } from '../actions/watch-events.actions';
import * as actions from '../constants/ActionTypes';
import * as urls from '../constants/urls';
// import { IAppState } from '../reducers/index'

@Injectable()
export class RepositoriesEpics {
  constructor(private http: Http) {}

  getDetails = (actions$) => {
    return actions$.ofType(actions.WATCH_EVENTS_GET_SUCCESS)
      .flatMap( ({payload}) => {
        const requests = payload
          .map(event => this.http.get(event.repo.url).map(resp => resp.json()));
        console.log(requests);

        return Observable.forkJoin(requests)
      })
      .map((repos) => {
        return {type: actions.REPOSITORIES_SUCCESS, payload: repos}
      });
  };
}