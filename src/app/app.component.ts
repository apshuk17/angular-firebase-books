import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './services/http.service';
import { AuthFirebaseService } from './services/auth-firebase.service';
import { DbFirebaseService } from './services/db-firebase.service';

import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showSignOut$: Observable<boolean>;
  showSignOut: boolean;

  constructor(private httpService: HttpService,
              private authFirebaseService: AuthFirebaseService,
              private dbFirebaseService: DbFirebaseService) {}

  signOut() {
    this.authFirebaseService.logout();
    this.dbFirebaseService.userLoggedIn$ = of(undefined);
    this.dbFirebaseService.roleUserLoggedIn = undefined;
  }

  ngOnInit() {
    this.showSignOut$ = this.httpService.showSignOut.asObservable();
  }
}
