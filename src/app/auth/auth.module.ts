import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthRoutingModule } from './auth-routing.module';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthFirebaseService } from '../services/auth-firebase.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { DbFirebaseService } from '../services/db-firebase.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AuthRoutingModule
  ],
  providers: [AuthFirebaseService, DbFirebaseService],
  declarations: [AuthenticationComponent, UserRegisterComponent, UserLoginComponent, AuthDialogComponent],
  entryComponents: [AuthDialogComponent]
})
export class AuthModule { }
