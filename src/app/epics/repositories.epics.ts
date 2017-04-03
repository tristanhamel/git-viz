import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as actions from '../constants/ActionTypes';

@Injectable()
export class RepositoriesEpics {
  constructor(private http: Http) {}

  getDetails = (actions$, store) => {
    return actions$.ofType(actions.WATCH_EVENTS_GET_SUCCESS)
      .flatMap( ({payload}) => {
        const requests = payload
          // make requests only for repos not already in store
          .filter(event => !store.repositories.some(repo => repo.id === event.repo.id))
          .map(event => {
            this.http.get(event.repo.url).map(resp => resp.json())
          });

        return Observable.forkJoin(requests)
      })
      .map((repos) => {
        return {type: actions.REPOSITORIES_SUCCESS, payload: repos}
      });
  };
}