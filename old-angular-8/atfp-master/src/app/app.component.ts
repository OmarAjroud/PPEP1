import { Component } from '@angular/core';
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import firebase
import { FCM } from '@ionic-native/fcm/ngx';
import { ViewChild } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AlertController, MenuController } from '@ionic/angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { stringify } from '@angular/compiler/src/util';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { GlobalsService } from './globals.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  
  public connecte: boolean = false

  constructor(
    // private androidPermissions: AndroidPermissions,
    private localnotification: LocalNotifications,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private g: GlobalsService,
    private router: Router,
    private location: Location,
    public alertCtrl: AlertController,
  ) {

    this.initializeApp();

  }

  subscribe: any;

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }




  openEnd() {

    this.close();
    this.menu.open('end');

  }
  close() {
    this.menu.close('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  initializeApp() {

    this.g.logging();



    console.log('staut non connecté    :' + this.g.notloggin);
    if (this.g.notloggin == false)
      this.connecte = true;
    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      console.log('back button case click');

      if (this.router.url === '/home') {
        this.presentAlert1();
      }
      else {
        if (this.router.url === '/inscription') {
          console.log('back button inscription');

          this.presentAlertinscription();
        }
        else {
          this.location.back();
          console.log('back button');
        }
      }

    });







    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      BackgroundMode.enable();

      // if (this.platform.is('cordova')) {
      this.setPlatformListener();
      this.g.getnotification();
      // }

    });
  }
  setPlatformListener() {
    this.platform.pause.subscribe(() => {// background
      console.log('In Background');
      this.g.getnotification();

    });

    this.platform.resume.subscribe(() => {// foreground
      console.log('In Foreground');
    });
  }
  exit() {
    this.presentAlertexit();
  }

  openfacebook() {
    window.open("https://www.facebook.com/atfp.tn", '_system', 'location=yes');

  }


  opensiteatfp() {
    window.open("http://atfp.tn", '_system', 'location=yes');

  }

  opensite() {
    window.open("http://www.inscription.atfp.tn", '_system', 'location=yes');

  }


  async presentAlert1() {
    const alert = await this.alertCtrl.create({
      header: '',
      message: '  هل تريد فعلاً إغلاق التطبيقة?',
      buttons: [
        {
          text: 'موافق',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            navigator["app"].exitApp();

          }
        }, {
          text: 'لا ',
          handler: () => {
            this.router.navigate(['/offre']);

          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertinscription() {
    const alert = await this.alertCtrl.create({
      header: '',
      message: '  انتقالك لصفحة أخرى يمحي معطياتك',
      buttons: [
        {
          text: 'موافق',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.location.back();

          }
        }, {
          text: 'لا ',
          handler: () => {
            console.log('nothing');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertexit() {
    const alert = await this.alertCtrl.create({
      header: '',
      message: '  هل تريد فعلاً إغلاق التطبيقة?',
      buttons: [
        {
          text: 'موافق',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            navigator["app"].exitApp();

          }
        }, {
          text: 'لا ',
          handler: () => {
            console.log('nothing');
          }
        }
      ]
    });

    await alert.present();
  }
}


