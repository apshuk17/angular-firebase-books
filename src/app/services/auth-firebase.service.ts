import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UserProfile } from '../model/user-profile';


@Injectable()
export class AuthFirebaseService {

  constructor(public afAuth: AngularFireAuth,
            public db: AngularFireDatabase) { }

  signupWithEmail(email: string, password: string): Observable<any> {
    const signUpProm = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return this.promiseToObservable(signUpProm);
  }

  loginWithEmail(email: string, password: string): Observable<firebase.User> {
    const loginProm = this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return this.promiseToObservable(loginProm);
  }

  addNewUser(userProfile: UserProfile): Observable<UserProfile> {
    const usersRef = this.db.list('Users');
    const newUserProm = usersRef.push(userProfile);
    return this.promiseToObservable(newUserProm);
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
