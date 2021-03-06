import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TopMenuComponent } from './menu/top-menu/top-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonService } from './services/common.service';
import { HttpService } from './services/http.service';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AuthModule,
    AppRoutingModule,
  ],
  providers: [CommonService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
