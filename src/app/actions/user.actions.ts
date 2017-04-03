import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as actions from '../constants/ActionTypes';
import { IAppState } from '../reducers/index';

@Injectable()
export class UserActions {
  constructor(private ngRedux: NgRedux<IAppState>) {}

  getToken(url) {
    console.log(url);
    this.ngRedux.dispatch({type: actions.USER_TOKEN_REQUEST, payload: url});
  }

  reset() {
    this.ngRedux.dispatch({type: actions.USER_RESET});
  }
}
