import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

const ADMIN_ROUTES: Routes = [
  {path: '', component: AdminComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
