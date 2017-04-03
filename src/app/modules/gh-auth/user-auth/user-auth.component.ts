import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { UserActions } from '../../../actions/user.actions';
import { IUser } from '../../../reducers/user.reducer';

@Component({
  selector: 'user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  @select(['user']) $user;

  user: IUser;

  constructor(private userActions: UserActions) { }

  ngOnInit() {
    this.$user.subscribe(
      user => this.user = user
    );

    const query= window.location.search;

    //if we got a query string, try to extract the 'code' param sent by github
    if(query) {
      const code = query.split('code=')[1] || null;

      if(code) {
        const url = `${window.location.origin}/api/auth?code=${code}`;
        this.userActions.getToken(url);
        window.history.replaceState({}, null, window.location.origin);
      }
    }
  }

  connectAccount(){
    const client_id = '47185db03eb31096ab32';
    // redirect to github for authentication
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
  }

  reset(){

  }
}
