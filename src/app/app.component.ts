import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';

import { WatchEventsActions } from './actions/watch-events.actions';
import { IEventObject } from './reducers/watch-events.reducer';

@Component({
  selector: 'gv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  events: [IEventObject];

  @select(['watchEvents', 'data']) $events;
  @select(['user', 'userName']) $user;

  constructor(private watchEventsActions: WatchEventsActions) {}

  ngOnInit() {
    // if we got no events stored, initiate request
    this.$events
      .subscribe(events => {
        this.events = events;
      });

    this.$user
      .subscribe(user => {
        if (user && (!this.events || !this.events.length)) {
          this.watchEventsActions.get();
        }
      });
  };
}
