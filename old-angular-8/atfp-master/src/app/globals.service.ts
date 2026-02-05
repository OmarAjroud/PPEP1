
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { isNullOrUndefined } from 'util';
import { logging } from 'selenium-webdriver';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthServiceService } from './sevices/auth-service.service';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  notloggin: boolean;
  tokencontent: string;
  isuser: boolean;
  isadmin: boolean;
  username: string;
  nom: string;
  nomA: string;
  prenom: string;
  prenomA: string;
  rougeATFP: string = "#FF0066";
  bleufonceATFP: string = "#003966";
  bleuATFP: string = "#36A1B3";
  jauneATFP: string = "#FFCC00";
  email: string;
  cin: string;
  id: number;
  affichemenu: boolean = true;
  utilisateur: string;
  min: number;
  nombrenotification: number;
  nombrenotificationcourant: number;
  connectedtointernet: boolean;
  sexe: boolean;
  adresse: string;
  tel: number;
  codepostal: number;
  constructor(private router: Router, public alertCtrl: AlertController, public alertCtrl1: AlertController, private authservice: AuthServiceService,
    private platform: Platform, private l: LocalNotifications,

    //,private androidPermissions: AndroidPermissions
  ) {
  }
  public logging(): void {
    this.checkConnection();


    if ((this.connectedtointernet == false)) {
      this.router.navigate(['/login']);

    }

    else {
      if (localStorage.getItem('usertoken') == null) {
        this.notloggin = true;
        this.isuser = false;
        this.isadmin = false;
        this.router.navigate(['/login']);
        this.nombrenotification = 0;
        this.username = null;
        this.nom = null;
        this.nomA = null;
        this.prenom = null;
        this.prenomA = null;
        this.sexe = false;
        console.log("sexe g " + this.sexe);
      }
      else {

        this.notloggin = false;
        if (this.connectedtointernet) {
          this.authservice.getuser()
            .subscribe(
              (data: any) => {
                if (data.donnee.Genre == "male") {
                  this.sexe = true;
                  console.log("sexe masculan g " + this.sexe);
                }
                else
                  this.sexe = false;
                console.log("sexe g " + this.sexe);
                this.username = data.userCredential.username;
                this.nom = data.userCredential.nom;
                this.prenom = data.userCredential.prenom;
                this.email = data.userCredential.email;
                this.id = data.userCredential.id;
                this.tel = data.donnee.TelMobile;
                this.codepostal = data.donnee.CodePostal;
                this.adresse = data.donnee.Adresse;

                if (!data.userCredential.nom) {
                  this.nom = data.userCredential.nomAr;
                  this.prenom = data.userCredential.prenomAr;


                }
              },
              (err: HttpErrorResponse) => {


                this.presentAlert(err.message);
              });




        }

      }
    }
  }
  /*
    async addnotification() {
  
      try {
        await this.platform.ready();
        const permission = await this.localnotification.requestPermission();
  
        // this.localnotification.requestPermission().then(
        //  (permission) => {
        if (permission === 'granted') {
          const options: LocalNotificationOptions = {
            tag: '',
            body: 'notifications',
            icon: 'assets/icon/dsi.ico'
          }
          // Create the notificaion
          const atfp = await this.localnotification.create('atfp notification', options);
          atfp.close();
        }
        //});
      }
      catch (e) {
        console.error(e);
      }
  
  
    }
    */
  async presentAlert(message) {


    const alert = await this.alertCtrl.create({
      header: 'info',
      subHeader: 'erreur',
      message: message,
      buttons: ['OK'],

    });

    await alert.present();
  }

  simpleNotif() {
    this.l.schedule({
      id: 1,
      title: 'Nouvelle Notification !!!',
      text: 'AGENCE TUNISIENNE DE LA FORMATION PROFESSIONNELLE',
      data: { secret: 'secret' },
      icon: 'file://assets/icon/dsi.ico',
      smallIcon: 'file://assets/icon/n.png',
      foreground: true,
      vibrate: true,
      led: '#222'
    }

    );
  }

  getnotification() {
    if ((this.notloggin == false) && (this.connectedtointernet)) {

      setInterval(data => {
        //the code
        this.authservice.getnotifications()
          .subscribe(
            (data1: any) => {
              console.log('Parcours des notifications');


              this.nombrenotificationcourant = data1.iTotalDisplayRecords;
              console.log("nombre notif courant :" + this.nombrenotificationcourant);
              console.log("nombre des notif precedent :" + this.nombrenotification);

              if (((this.nombrenotificationcourant > 0) && (this.nombrenotificationcourant > this.nombrenotification)) || (!this.nombrenotification)) {

                if (this.nombrenotification) {


                  let nombre = this.nombrenotificationcourant;
                  this.simpleNotif();
                }
                this.nombrenotification = this.nombrenotificationcourant;

              }



            },
            (err: HttpErrorResponse) => {


              console.log('err.message');
            });

      }
        , 10000);


    }
  }

  checkConnection() {
    this.platform.ready().then(() => {   // should i wait for this
      if (navigator.onLine) {
        console.log('Internet is connected');
        this.connectedtointernet = true;
      } else {
        console.log('No internet connection');
        this.connectedtointernet = false;


      }
      console.log(this.connectedtointernet);
    });
  }


}
