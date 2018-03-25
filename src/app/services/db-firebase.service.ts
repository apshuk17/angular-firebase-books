import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { UserDb } from '../model/user-db';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class DbFirebaseService {

  constructor(private afd: AngularFireDatabase) { }

  users$: FirebaseListObservable<UserDb[]>;
  userLoggedIn$: Observable<UserDb>;
  roleUserLoggedIn: string;

  getAllUsers(): FirebaseListObservable<UserDb[]> {
    return this.users$ = this.afd.list('Users');
  }

  getUser(user) {
    return this.afd.object(`Users/${user.$key}`);
  }

  getUserRole() {
    let role: string;
    this.userLoggedIn$.subscribe(user => role = user.role);
    return role;
  }

  getLoggenInUser(id: string): Observable<UserDb> {
    return this.getAllUsers().pipe(
      switchMap((users: UserDb[]) => {
        const userLgin = users.find((user: UserDb) => user.uid === id);
        this.roleUserLoggedIn = userLgin.role;
        console.log(this.roleUserLoggedIn);
        return this.getUser(userLgin);
      })
    );
  }

}
