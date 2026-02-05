import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../sevices/auth-service.service';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:
    [AuthServiceService,
      // AndroidPermissions
    ]
  ,
  declarations: [LoginPage]
})
export class LoginPageModule {


}
