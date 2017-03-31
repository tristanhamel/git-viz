import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as actions from '../constants/ActionTypes';
import { IAppState } from '../reducers/index';

@Injectable()
export class WatchEventsActions {
  constructor(private ngRedux: NgRedux<IAppState>) {}

  get() {
    const { userName } = this.ngRedux.getState().user;
    this.ngRedux.dispatch({type: actions.WATCH_EVENTS_GET, payload: userName});
  }

  reset() {
    this.ngRedux.dispatch({type: actions.WATCH_EVENTS_GET});
  }
}
