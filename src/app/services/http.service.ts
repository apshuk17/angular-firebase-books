import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HttpService {

  showSignOut: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  firebaseUser: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(undefined);
  constructor() { }

}
