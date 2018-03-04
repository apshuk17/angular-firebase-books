import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';

const USER_ROUTES: Routes = [
  {path: '', component: UserComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(USER_ROUTES)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
