import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { WatchEventsActions } from '../../actions/watch-events.actions';

@Component({
  selector: 'repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {
  // @select(collection => collection
  //   .flatMap()
  //   .map(item => ({name: item.repo.name, id: item.repo.id})
  // )) $repositories;

  @select(['watchEvents', 'data']) $events;

  constructor(private watchEventsActions: WatchEventsActions) { }

  ngOnInit() {
  }

  getRepos() {
    this.watchEventsActions.get();
  }
}
