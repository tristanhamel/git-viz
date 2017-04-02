import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  query: string;

  constructor(private http: Http) { }

  ngOnInit() {
    this.query= window.location.search;
    console.log(this.query);

    //if we got a query string, try to extract the 'code' param sent by github
    if(this.query) {
      const code = this.query.split('code=')[1] || null;

      if(code) {
        const url = `${window.location.origin}/api/auth?code=${code}`;
        this.http.post(url, {})
          .subscribe(response => console.log(response.json()));
        //TODO: save token in store and clear url params
      }
    }
  }

  connectAccount(){
    const client_id = '47185db03eb31096ab32';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
  }
}
