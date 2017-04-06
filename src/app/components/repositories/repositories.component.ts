import { Component, OnInit } from '@angular/core';

import { ReposSelector } from '../../services/repos.service';
import { Observable } from 'rxjs/Observable';
import { IRepository } from '../../reducers/repositories.reducer';

@Component({
  selector: 'gv-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

  $repos: Observable<[IRepository]>;

  constructor(private reposSelector: ReposSelector) {
  }

  ngOnInit() {
    this.$repos = this.reposSelector.starred();
  };
}
