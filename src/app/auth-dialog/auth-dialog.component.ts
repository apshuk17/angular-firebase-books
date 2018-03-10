import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {

  email: string;
  role: string;

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    console.log(data);
    this.email = data.email;
    this.role = data.role;
   }

  ngOnInit() {
  }

}
