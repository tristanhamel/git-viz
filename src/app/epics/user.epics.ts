import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import * as actions from '../constants/ActionTypes';

@Injectable()
export class UsersEpics {
  constructor(private http: Http) {}

  getToken = (action$) => {
    return action$.ofType(actions.USER_TOKEN_REQUEST)
      .mergeMap( ({payload}) => {
        return this.http.post(payload, {})
          .map(response => ({type: actions.USER_TOKEN_RECEIVE, payload: response.json().access_token}));
      });
  };

  // once we got a token, get the user info
  getUserInfo = (action$) => {
    return action$.ofType(actions.USER_TOKEN_RECEIVE)
      .mergeMap( () => {
        return this.http.get('https://api.github.com/user')
          .map(response => ({type: actions.USER_INFO_RECEIVE, payload: response.json()}));
      });
  };
}
