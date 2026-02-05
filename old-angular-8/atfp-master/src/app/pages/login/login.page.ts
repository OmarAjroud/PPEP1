import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthServiceService } from '../../sevices/auth-service.service';
import { Router } from '@angular/router';
import { GlobalsService } from './../../globals.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

interface Credentials {
  username: string,
  password: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {



  constructor(private g: GlobalsService, private router: Router, private platform: Platform, public alertCtrl: AlertController, public alertCtrl1: AlertController, private authservice: AuthServiceService

    //,private androidPermissions: AndroidPermissions
  ) {

  }

  login: string; password: string;
  msgH: string;
  tk: string;
  messagebody: string;
  subject: string;
  credentials: Credentials;
  ngOnInit() {
    this.login = "199700266264";
    this.password = "12679668";
    /* this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.IN).then(
       result => console.log('Has permission?', result.hasPermission),
       err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
     );
 
     this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.INTERNET, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
 */
    this.g.checkConnection();
    if (this.g.connectedtointernet == false) {
      this.presentAlert("أنت غير متصل بالإنترنت");

    }
    else if (localStorage.getItem('usertoken') != null) {
      this.router.navigate(['/home']);

    }


  }
  async presentAlert(message) {

    this.subject = "info";
    this.messagebody = message;
    const alert = await this.alertCtrl.create({
      header: 'info',
      subHeader: this.subject,
      message: this.messagebody,
      buttons: ['OK'],

    });

    await alert.present();
  }

  onSubmit(credentials) {
    console.log(JSON.stringify(credentials));
    this.g.checkConnection();
    if (this.g.connectedtointernet == false) {
      this.presentAlert("أنت غير متصل بالإنترنت");

    }
    else {
      this.authservice.login(credentials)
        .subscribe(
          (data: any) => {

            if (data.token != null) {
              var date = new Date();
              localStorage.setItem('date', date.toString());
              localStorage.setItem('usertoken', data.token);
              this.g.logging();
              setTimeout(() => {
                console.log('hello');
              }, 3000);
              window.location.reload()



            }
            else
              this.presentAlert("الرجاء التثبت من البيانات");

          },
          (err: HttpErrorResponse) => {
            console.log(JSON.stringify(credentials));

            this.presentAlert("لا يمكن الوصول لموقع التسجيل عن بعد");
          }

        );

    }

  }
  open() {
    window.open("http://41.231.253.195", '_system', 'location=yes');

  }


}
