import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../../services/auth-firebase.service';
import { CommonService } from '../../services/common.service';
import { AuthDialogComponent } from '../../auth-dialog/auth-dialog.component';
import { DbFirebaseService } from '../../services/db-firebase.service';
import { HttpService } from '../../services/http.service';
import { UserDb } from '../../model/user-db';

import { MatDialog, MatDialogConfig } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {

  userLoginForm: FormGroup;
  userLoginSubscription$$: Subscription;

  constructor(private fb: FormBuilder,
              private commonService: CommonService,
              private dialog: MatDialog,
              private authFirebaseService: AuthFirebaseService,
              private dbFirebaseService: DbFirebaseService,
              private router: Router,
              private httpService: HttpService) { }

  createForm() {
    this.userLoginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required]
    });
  }

  onLogin() {
    const email = this.userLoginForm.value['userName'];
    const password = this.userLoginForm.value['userPassword'];
    this.userLoginSubscription$$ = this.authFirebaseService.loginWithEmail(email, password).pipe(
      switchMap((res) => {
        if (res.uid) {
          // get logged in user
          return this.dbFirebaseService.userLoggedIn$ = this.dbFirebaseService.getLoggenInUser(res.uid);
        } else {
          const msg = res['message'];
          return of(msg);
        }
      })
    )
    .subscribe(res => {
      // this.authFirebaseService.getAuthState().subscribe(console.log);
      if (res.uid) {
        // Enabling sign out button on header
        this.httpService.showSignOut.next(true);

        // Navigating to admin route
        this.router.navigate(['/' + res.role]);

        // Creating dialog modal ref
        // const dialogData = {email: res.email, role: undefined, status: true, message: undefined};
        // const authDialogRef = this.commonService.createDialogRef(dialogData);
        // this.dialog.open(AuthDialogComponent, authDialogRef);
      } else {
        // this.dbFirebaseService.userLoggedIn$ = of(undefined);
        // Creating dialog modal ref
        const dialogData = {email: undefined, role: undefined, status: false, message: res};
        const authDialogRef = this.commonService.createDialogRef(dialogData);
        this.dialog.open(AuthDialogComponent, authDialogRef);

      }
    });
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.userLoginSubscription$$.unsubscribe();
  }

}
