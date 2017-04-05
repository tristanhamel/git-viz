import { Injectable } from '@angular/core';
import { select } from '@angular-redux/store';
import 'rxjs/operator/combineLatest';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { IRepository } from '../reducers/repositories.reducer';
import { IEventObject } from '../reducers/watch-events.reducer';


@Injectable()
export class ReposSelector {
  @select(['watchEvents', 'data']) $events: Observable<[IEventObject]>;

  @select(['repositories', 'data']) $repos: Observable<[IRepository]>;

  constructor() {}

  starred(): Observable<[IRepository]> {
    return combineLatest(this.$events, this.$repos, (events, repos) => {
        const ids = events
          .filter(event => event.type === 'WatchEvent')
          .map(event => event.repo.id);
        console.log(ids);

        return repos.filter(repo => ids.indexOf(repo.id) !== -1);
      });
  }
}
