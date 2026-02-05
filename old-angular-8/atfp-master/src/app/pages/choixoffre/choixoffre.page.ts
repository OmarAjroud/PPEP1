import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../globals.service';
import { AuthServiceService } from '../../sevices/auth-service.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { AlertController, MenuController } from '@ionic/angular';

import { Router } from '@angular/router';
import { ProfileModel } from '../../logic/Profile.model';
import { RegistrationService } from './../../registration/registration.service';
export class Choix {
  specialite_refIn: string;
  centre_refIn: string
}
export class Offre {
  id: string;
  ordre: string;
  etatnumerique: number;
  etat: string;
  diplome: string;
  specialite: string;
  centre: string;
  couleur: string;
  foyer: string;
  session: string;
  nbplaces: string;
  debutformation: string;
  finformation: string;
  delaisvalidation: string;
}
export class DiplomeModel {
  id: number;
  code: string;
  libelle_Ar: string;
  libelle_Fr: string;
  libelle_En: string;
}

export class Diplome {
  id: string;
  libelle_Ar: string;
  libelle_En: string;
  created: string;
  updated: string;
}
export class SpecialityModel {
  id: number;
  code: number;
  libelle_Ar: string;
  libelle_Fr: string;
  libelle_En: string;
  bourse: boolean;
  diplome: DiplomeModel;
}
export class DiplomeF {
  id: string;
  code: string;
  weight: string;
  enabled: boolean;
  libelle_Ar: string;
  libelle_Fr: string;
  libelle_En: string
  created: string;
  updated: string;
}
export class Centre {
  id: number;
  code: number;
  libelle_Ar: string;
  libelle_Fr: string;
  libelle_En: string;
  adresse: string;
}
export class Gouvernorat {
  id: string;
  libelle_Ar: string;
  libelle_Fr: string;
  libelle_En: string;
  created: string;
  updated: string;
}
export class SpecialiteScolaire {
  id: string;
  libelle_Ar: string;
  libelle_En: string;
  created: string;
  updated: string;
}
@Component({
  selector: 'app-choixoffre',
  templateUrl: './choixoffre.page.html',
  styleUrls: ['./choixoffre.page.scss'],
})
export class ChoixoffrePage implements OnInit {
  govs: Gouvernorat[] = [];
  specialiteScolaire: SpecialiteScolaire = new SpecialiteScolaire();
  spcialitescoloaires: SpecialiteScolaire[] = [];
  centresspec: [] = [];
  spcialitescoloairesaf: SpecialityModel[] = [];
  emailincorrecte: boolean;
  diplome: Diplome = new Diplome();
  diplomes: Diplome[] = [];
  diplomef: DiplomeF = new DiplomeF();
  diplomesf: DiplomeF[] = [];
  nombreoffres: number; i: number;
  offres: Offre[] = [];
  offre: Offre = new Offre();
  autorizationbouton: boolean;
  offrenombre: number;
  choix: Choix;
  nombreOffre: number;
  afficherOffre: boolean;
  affiche: boolean;
  specialitesAncienneFormationModel: number;
  CentreAncienneFormationModel: number;
  ancienneFormationDiplomef: number;
  constructor(private authservice: AuthServiceService,
    private router: Router, private g: GlobalsService,
    private registration: RegistrationService,
    public alertCtrl: AlertController, public alertCtrl1: AlertController, public reservation: RegistrationService) { }

  ngOnInit() {
    this.affiche = false;
    const select = document.querySelector('ion-select');

    select.interfaceOptions = {
      cssClass: 'custom-popover'
    }
    this.g.checkConnection();
    if (this.g.connectedtointernet == false) {
      this.presentAlert("info", "أنت غير متصل بالإنترنت");
      this.router.navigate(['/login']);

    }
    this.g.logging();
    if ((this.g.notloggin == true) && (!localStorage.getItem('usertoken'))) {

      this.router.navigate(['/login']);
    }
    else {
      this.registration.getAllDeplomesFomation()
        .subscribe(
          (data: any) => {
            console.log('success');


            this.diplomesf = data;

          },
          (err: HttpErrorResponse) => {


            this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
          });
      this.authservice.getgov()
        .subscribe(
          (data: any) => {
            console.log('success');


            this.govs = data;

          },
          (err: HttpErrorResponse) => {


            this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");

          });

    }
    this.cherchercentre();
  }
  async presentAlert(title, message) {


    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: title,
      message: message,
      buttons: ['موافق'],

    });

    await alert.present();
  }




  cherchersaf(id) {
    this.registration.getAllSpecialitesAncienneFormationByDiplome(id)
      .subscribe(
        (data: any) => {
          console.log('success');


          this.spcialitescoloairesaf = data;

        },
        (err: HttpErrorResponse) => {


          this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");

        });
  }

  cherchercentre() {
    console.log('begin');
    this.registration.getAllCentres()
      .subscribe(
        (data: any) => {
          console.log('success');


          this.centresspec = data;
          console.log(JSON.stringify(data));

        },
        (err: HttpErrorResponse) => {


          this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");

        });
  }

  cherchercentrespec(id) {
    console.log('begin');
    this.registration.getAllCentresBySpecialite(id)
      .subscribe(
        (data: any) => {
          console.log('success');


          this.centresspec = data;
          console.log(JSON.stringify(data));

        },
        (err: HttpErrorResponse) => {


          this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");

        });
  }
  afficheroffre(s, c) {
    console.log("debut recherche offre" + s + c);
    this.affiche = true;
    this.autorizationbouton = true;
    this.offres = null;
    this.offres = [];
    this.offre = null;
    this.offre = new Offre();
    this.choix = new Choix();
    this.choix.specialite_refIn = s;
    this.choix.centre_refIn = c;
    // for (let i = 0; i < this.centresspec.length; i++) {
    //   if (this.centresspec[i].)

    // }
    let offre1 = "lowerOffre";
    let start = '0';
    let length = "100";

    this.authservice.getoffreschoix(s, c, offre1, start, length)
      .subscribe(
        (data: any) => {
          // console.log('success' + data.aaData[0].id);
          // console.log(JSON.stringify(this.choix));


          //let s = data.aaData[this.i].comment.replace(/\n      /g, " ");
          //  this.offre.ordre = s.trim();
          /*  console.log(data[this.i].status);
           switch (data[this.i].status) {
 
             case 0: this.offre.etat = " مسودة"; this.offre.couleur = "warning"; break;
             case 1: this.offre.etat = "في الإنتظار"; this.offre.couleur = "primary"; break;
             case 2: this.offre.etat = "مقبول أولياً"; this.offre.couleur = "success"; break;
             case 3: this.offre.etat = "غير مقبول"; this.offre.couleur = "danger"; break;
             case 4: this.offre.etat = " معطيات إضافية"; this.offre.couleur = "warning"; break;
             case 6: this.offre.etat = "تاكيد الترشح "; this.offre.couleur = "secondary"; break;
             case 8: this.offre.etat = "ملف مقبول"; this.offre.couleur = "success"; break;
             case 9: this.offre.etat = "ملف غير مقبول	"; this.offre.couleur = "danger"; break;
             case 13: this.offre.etat = " مطلوب لمناظرة"; this.offre.couleur = "secondary"; break;
             case 15: this.offre.etat = "  مرفوض في المناظرة"; this.offre.couleur = "danger"; break;
 
 
             default: this.offre.etat = data[this.i].status; break;
           }
           this.offre.etatnumerique = data[this.i].status;
           if ((this.offre.etatnumerique == 6) || (this.offre.etatnumerique == 8))
             this.autorizationbouton = false;
          
          this.offre.ordre = data[this.i].ordre;
             */

          this.nombreOffre = data.aaData.length;
          if (this.nombreOffre == 0) {
            this.afficherOffre = false;
            this.presentAlert("", "عرض غير متوفر حالياً");
          }
          else {
            this.presentAlert("", " هناك " + this.nombreOffre + " عرض");
            this.afficherOffre = true;
          }
          for (let i = 0; i < data.aaData.length; i++) {
            this.offre = new Offre();
            this.offre.id = data.aaData[i].id;
            this.offre.diplome = data.aaData[i].specialite.diplome.libelle_Ar;
            this.offre.centre = data.aaData[i].centre.libelle_Ar;
            this.offre.specialite = data.aaData[i].specialite.libelle_Ar;
            if (data.aaData[i].hebergement == true)
              this.offre.foyer = "نعم";
            else this.offre.foyer = "لا";
            this.offre.session = data.aaData[i].sessionInscription.label;
            this.offre.nbplaces = data.aaData[i].nbPlace;
            this.offre.debutformation = data.aaData[i].debutFormation;
            this.offre.debutformation = this.offre.debutformation.substring(0, 10);
            this.offre.finformation = data.aaData[i].finFormation;
            this.offre.finformation = this.offre.finformation.substring(0, 10);

            this.offre.delaisvalidation = data.aaData[i].delaiValidation;
            this.offre.delaisvalidation = this.offre.delaisvalidation.substring(0, 10);




            this.offres.push(this.offre);
          }


        },
        (err: HttpErrorResponse) => {


          this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
        });


  }
  choisircandidature(id) {
    console.log(id);
    console.log("debut recherche offre");

    this.authservice.createcandidature(id)
      .subscribe(
        (data: any) => {

          this.presentAlert('', "offre crée");
          this.presentAlert1();


        },
        (err: HttpErrorResponse) => {


          this.presentAlert('', "(3)  لقد بلغت العدد الاقصى من العروض    ");
        });



  }
  affichageoffrecomplet(id) {
    console.log("affichage");

    var parent = document.getElementById(id);
    console.log(parent);
    parent.style.display = "block";

  }

  cacheroffrecomplet(id) {
    console.log("chaher elements");

    var parent = document.getElementById(id);
    console.log(parent);
    parent.style.display = "none";

  }

  initialiser() {
    this.ngOnInit();
    console.log("--------------------------------------------------------------");
  }


  async presentAlert1() {
    const alert = await this.alertCtrl.create({
      header: '',
      message: '          هل ترغب في تاكيد ترشحك ?',
      buttons: [
        {
          text: 'إختيار عرض جديد',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'تاكيد ترشحك',
          handler: () => {
            this.router.navigate(['/offre']);

          }
        }
      ]
    });

    await alert.present();
  }

}
