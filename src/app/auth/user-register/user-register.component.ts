import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PasswordValidation } from '../password-validation';
import { AuthFirebaseService } from '../../services/auth-firebase.service';
import { UserProfile } from '../../model/user-profile';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  userRegisterForm: FormGroup;

  userRoles = [{role: 'admin', value: 'Admin'}, {role: 'user', value: 'User'}];

  constructor(private fb: FormBuilder,
            private authFirebaseService: AuthFirebaseService,
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
    // this.userRegisterForm.setValue({
    //   userName: '', userPassword: '', userConfirmPassword: '', userRole: ''
    // });
    this.userRegisterForm.reset();

    Object.keys(this.userRegisterForm.controls).forEach(key => {
      this.userRegisterForm.controls[key].setErrors(null);
    });
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
    this.authFirebaseService.signupWithEmail(email, password)
    .switchMap(res => {
      if (res.uid) {
        userProfile = this.createUserProfile(res.uid, res.email, role);
        this.resetForm();
        return this.authFirebaseService.addNewUser(userProfile);
      } else {
        return Observable.of({uid: '', email: '', role: '', message: res.message});
      }
    })
    .subscribe(res => {
      if (res.message) {
        alert(res.message);
      }
    });
  }

  ngOnInit() {
    this.createForm();
  }

}
