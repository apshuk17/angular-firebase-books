import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userLoginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  createForm() {
    this.userLoginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.createForm();
  }

}
