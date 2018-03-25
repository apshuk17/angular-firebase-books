import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PasswordValidation } from '../password-validation';
import { AuthFirebaseService } from '../../services/auth-firebase.service';
import { UserProfile } from '../../model/user-profile';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthDialogComponent } from '../../auth-dialog/auth-dialog.component';
import { CommonService } from '../../services/common.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit, OnDestroy {

  userRegisterForm: FormGroup;
  userSignupSubscription$$: Subscription;
  userRoles = [{role: 'admin', value: 'Admin'}, {role: 'user', value: 'User'}];
  isSub = false;

  constructor(private fb: FormBuilder,
            private commonService: CommonService,
            private authFirebaseService: AuthFirebaseService,
            private dialog: MatDialog,
            private router: Router) { }

  createForm() {
    this.userRegisterForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required],
      userConfirmPassword: ['', Validators.required],
      userRole: ['', Validators.required]
    },
    {
      validator: PasswordValidation.validatePassword
    });
  }

  resetForm() {

    // Object.keys(this.userRegisterForm.controls).forEach(key => {
    //   this.userRegisterForm.controls[key].setErrors(null);
    // });
    this.userRegisterForm.reset();

  }

  createUserProfile(uid, email, role): UserProfile {
    return {
      uid: uid,
      email: email,
      role: role
    };
  }

  signUp() {
    let userProfile: UserProfile;
    const email = this.userRegisterForm.value['userName'];
    const password = this.userRegisterForm.value['userPassword'];
    const role = this.userRegisterForm.value['userRole'];
    this.userSignupSubscription$$ = this.authFirebaseService.signupWithEmail(email, password)
    .switchMap(res => {
      this.isSub = true;
      if (res.uid) {
        userProfile = this.createUserProfile(res.uid, res.email, role);
        this.resetForm();

        // Creating dialog modal ref
        const dialogData = {email: res.email, role, status: true, message: undefined};
        const authDialogRef = this.commonService.createDialogRef(dialogData);
        this.dialog.open(AuthDialogComponent, authDialogRef);

        // Adding user to database
        return this.authFirebaseService.addNewUser(userProfile);
      } else {
        // Creating dialog modal ref
        const dialogData = {email: undefined, role: undefined, status: false, message: res.message};
        const authDialogRef = this.commonService.createDialogRef(dialogData);
        this.dialog.open(AuthDialogComponent, authDialogRef);

        return Observable.of({uid: '', email: '', role: '', message: res.message});
      }
    })
    .subscribe();
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    if (this.isSub) {
      this.userSignupSubscription$$.unsubscribe();
    }
  }

}
