import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PasswordValidation } from '../password-validation';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  userRegisterForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  createForm() {
    this.userRegisterForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required],
      userConfirmPassword: ['', Validators.required]
    },
    {
      validator: PasswordValidation.validatePassword
    });
  }

  ngOnInit() {
    this.createForm();
  }

}
