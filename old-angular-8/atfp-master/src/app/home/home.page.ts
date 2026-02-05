import { Component, OnInit } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Platform } from '@ionic/angular';
import { AlertController, MenuController } from '@ionic/angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { stringify } from '@angular/compiler/src/util';
import { analyzeAndValidateNgModules, viewClassName } from '@angular/compiler';
import { Router } from '@angular/router';
import { GlobalsService } from './../globals.service';
interface NotificationHamdi {
  wasTapped: string,
  titre: string,
  messagebody: string
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  handvisible: boolean = true;


  constructor(private fcm: FCM, private menu: MenuController,

    private router: Router, public alertCtrl: AlertController, public alertCtrl1: AlertController,
    private g: GlobalsService, private platform: Platform
  ) {

  }
  subscribe: any;
  headElements = ['titre', 'message'];
  public notification: NotificationHamdi;

  msgH: string;
  tk: string;
  messagebody: string;
  subject: string;
  ngOnInit() {
    setTimeout(function () {
      document.getElementById('boutonclick').click();
    }, 1500);

    setTimeout(function () {
      document.getElementById('boutonclick').click();
    }, 500);




    this.g.checkConnection();
    if (!this.g.connectedtointernet) {
      //alert("أنت غير متصل بالإنترنت");
      this.router.navigate(['/login']);

    }

    else {


      this.subject = "sujet de la notification";
      this.messagebody = "corps de la notification ";
      this.tk = "notoken";
      this.msgH = "pas de message";




      this.fcm.getToken().then(token => {
        localStorage.setItem('token', token);
        console.log(token);
        this.tk = JSON.stringify(localStorage.getItem('token'));

      });
      this.fcm.onTokenRefresh().subscribe(token => {
        localStorage.setItem('token', token);
        console.log(token);
        this.tk = JSON.stringify(localStorage.getItem('token'));


      });
      this.fcm.onNotification().subscribe(
        (msg: any) => {


          if (msg.wasTapped) {
            localStorage.setItem('body', JSON.stringify(msg.body));
            localStorage.setItem('title', JSON.stringify(msg.title));
          }
          else {
            localStorage.setItem('body', JSON.stringify(msg.body));
            localStorage.setItem('title', JSON.stringify(msg.title));
          }
          this.router.navigate(['/dashboard']);


        });

      /*
          this.platform.ready().then(() => {
      
            if (this.platform.is('cordova')) {
      
      
      
              //Subscribe on resume i.e. foreground 
              this.platform.resume.subscribe(() => {
                this.g.getnotification();
              });
            }
          }); */
    }
  }

  async presentAlert() {
    this.ngOnInit();
    let title, body: string;
    if (localStorage.getItem("title")) {
      title = localStorage.getItem("title");
      body = localStorage.getItem("body");
      this.subject = title.trim();
      this.subject = this.subject.substring(1, this.subject.length - 1).trim();
      this.messagebody = body;
      this.messagebody = this.messagebody.substring(1, this.messagebody.length - 1).trim();

      this.msgH = this.messagebody;
    }


    const alert = await this.alertCtrl.create({
      header: ' إشعار ATFP ',
      subHeader: this.subject,
      message: this.messagebody,
      buttons: ['موافق']
    });

    await alert.present();
  }



  async deletemsg() {
    const alert = await this.alertCtrl1.create({
      header: '!',
      message: 'هل تريد حذف هذا <strong>الإشعار</strong>!!!',
      buttons: [
        {
          text: 'غلق',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            localStorage.removeItem("notification");
            this.subject = "";
            this.messagebody = "";

            this.msgH = "";


          }
        }
      ]
    });
    await alert.present();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async deletetoken() {
    const alert = await this.alertCtrl1.create({
      header: '!',
      message: 'هل تريد حذف هذا <strong>token</strong>!!!',
      buttons: [
        {
          text: 'غلق',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'موافق',
          handler: () => {
            localStorage.removeItem("token");
            this.tk = "";
          }
        }
      ]
    });
    await alert.present();
  }
  /*
  startService() {
    // Notification importance is optional, the default is 1 - Low (no sound or vibration)
    this.foregroundService.start('GPS Running', 'Background Service', 'drawable/fsicon');
  }

  stopService() {
    // Disable the foreground service
    this.foregroundService.stop();
  }
  */

  afficherimage() {
    if (this.handvisible)
      this.handvisible = false;
    else
      this.handvisible = true;
  }

}

