import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../globals.service';
import { AuthServiceService } from '../../sevices/auth-service.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

export class Message {
  sujet: string;
  message: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  login: string; password: string;
  msgH: string;
  tk: string;
  messagebody: string;
  subject: string;
  nombrenotif: number; i: number;
  notifications: Message[] = [];
  notification: Message = new Message();

  constructor(private router: Router, private g: GlobalsService, private authservice: AuthServiceService, public alertCtrl: AlertController, public alertCtrl1: AlertController
  ) {

  }

  ngOnInit() {
    this.g.checkConnection();
    if (this.g.connectedtointernet == false) {
      this.presentAlert("info", "أنت غير متصل بالإنترنت");
      this.router.navigate(['/login']);

    }
    else {

      this.g.logging();
      if ((this.g.notloggin == false) && (localStorage.getItem('usertoken')) && this.g.connectedtointernet) {
        this.authservice.getnotifications()
          .subscribe(
            (data: any) => {
              console.log('success');


              this.nombrenotif = data.iTotalDisplayRecords;

              for (this.i = 0; this.i < this.nombrenotif; this.i++) {
                this.notification = new Message();
                this.notification.sujet = data.aaData[this.i].subject;
                let s = data.aaData[this.i].comment.replace(/\n      /g, " ");
                this.notification.message = s.trim();
                this.notifications.push(this.notification);
              }



            },
            (err: HttpErrorResponse) => {


              this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
            });
      }
      else {
        this.router.navigate(['/login']);
      }

    }
  }
  async presentAlert(title, message) {

    this.subject = '';
    this.messagebody = message;
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: this.subject,
      message: this.messagebody,
      buttons: ['OK'],

    });

    await alert.present();
  }



}


