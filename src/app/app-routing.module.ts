import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [
  { path: 'register', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'},
  { path: 'user', loadChildren: 'app/user/user.module#UserModule'},
  { path: '', redirectTo: '/register', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
