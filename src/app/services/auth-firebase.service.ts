import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UserProfile } from '../model/user-profile';
import { HttpService } from './http.service';


@Injectable()
export class AuthFirebaseService {

  constructor(public afAuth: AngularFireAuth,
            public db: AngularFireDatabase,
            private httpService: HttpService,
            private router: Router) { }

  signupWithEmail(email: string, password: string): Observable<any> {
    const signUpProm = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return this.promiseToObservable(signUpProm);
  }

  loginWithEmail(email: string, password: string): Observable<firebase.User> {
    const loginProm = this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return this.promiseToObservable(loginProm);
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  addNewUser(userProfile: UserProfile): Observable<UserProfile> {
    const usersRef = this.db.list('Users');
    const newUserProm = usersRef.push(userProfile);
    return this.promiseToObservable(newUserProm);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.httpService.showSignOut.next(false);
    this.router.navigate(['/']);
  }

  promiseToObservable(promise): Observable<any> {
    const subject = new Subject<any>();

    promise.then(res => {
      subject.next(res);
      subject.complete();
    }, err => {
      subject.next(err);
      subject.complete();
    });

    return subject.asObservable();
  }

}
