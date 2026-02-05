import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { GlobalsService } from '../../globals.service';
import { AuthServiceService } from '../../sevices/auth-service.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
export class Offre {
  id: string;
  ordre: string;
  etatnumerique: number;
  etat: string;
  diplome: string;
  specialite: string;
  centre: string;
  couleur: string;
  idoffre: string;
  hebergement: string;
  bourse: string;
  debutformation: string;

}
@Component({
  selector: 'app-offre',
  templateUrl: './offre.page.html',
  styleUrls: ['./offre.page.scss'],
})
export class OffrePage implements OnInit {
  login: string; password: string;
  msgH: string;
  tk: string;
  messagebody: string;
  subject: string;
  nombreoffres: number; i: number;
  offres: Offre[] = [];
  offre: Offre = new Offre();
  autorizationbouton: boolean;
  offrenombre: number;
  constructor(private router: Router, private g: GlobalsService, private authservice: AuthServiceService,
    public alertCtrl: AlertController, public alertCtrl1: AlertController
  ) {

  }

  ngOnInit() {
    this.g.checkConnection();
    if (this.g.connectedtointernet == false) {
      this.presentAlert("info", "أنت غير متصل بالإنترنت");
      this.router.navigate(['/login']);

    }
    this.autorizationbouton = true;
    this.offres = [];
    this.g.logging();
    if ((this.g.notloggin == false) && (localStorage.getItem('usertoken')) && this.g.connectedtointernet) {
      this.authservice.getoffres()
        .subscribe(
          (data: any) => {
            console.log('success');



            this.offrenombre = 1;
            while (data[this.offrenombre]) {

              this.offrenombre = this.offrenombre + 1;

            }
            this.nombreoffres = this.offrenombre;
            for (this.i = 0; this.i < this.nombreoffres; this.i++) {
              this.offre = new Offre();
              //let s = data.aaData[this.i].comment.replace(/\n      /g, " ");
              //  this.offre.ordre = s.trim();

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
              this.offre.id = data[this.i].id;
              this.offre.diplome = data[this.i].offre.specialite.diplome.libelle_Ar;
              this.offre.centre = data[this.i].offre.centre.libelle_Ar;
              this.offre.specialite = data[this.i].offre.specialite.libelle_Ar;
              this.offre.idoffre = data[this.i].offre.id;
              if (data[this.i].offre.hebergement == true)
                this.offre.hebergement = "نعم";
              else this.offre.hebergement = "لا";
              if (data[this.i].offre.bourse == true)
                this.offre.bourse = "نعم";
              else this.offre.bourse = "لا";
              this.offre.debutformation = data[this.i].offre.debutFormation;
              this.offre.debutformation = this.offre.debutformation.substring(0, 10);
              console.log("------------------------------------------------------------------------------");
              console.log(JSON.stringify(data[this.i].offre));
              console.log("------------------------------------------------------------------------------");
              console.log(this.offre.debutformation);
              this.offres.push(this.offre);
            }

          },
          (err: HttpErrorResponse) => {


            this.presentAlert('error', err.message);
          });
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  async presentAlert(title, message) {

    this.subject = '';
    this.messagebody = message;
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: this.subject,
      message: this.messagebody,
      buttons: ['موافق'],

    });

    await alert.present();
  }

  verifier(id) {
    let c = confirm("هل أنت فعلاً موافق");
    this.authservice.approuvercandidature(id)
      .subscribe(
        (data: any) => {
          console.log('success');

          this.ngOnInit();
        },
        (err: HttpErrorResponse) => {
          this.presentAlert('', err.message);
        });
  }
  tester(etat) {
    if ((etat == 2) && (this.autorizationbouton == true))
      return true;
    else return false;
  }

  tester1(etat) {
    if ((etat == 0) && (this.autorizationbouton == true))
      return true;
    else return false;
  }

  verifier1(id) {
    let c = confirm("هل أنت فعلاً موافق");
    this.authservice.approuvercandidaturebrouillon(id)
      .subscribe(
        (data: any) => {
          console.log('success');
          this.ngOnInit();
        },
        (err: HttpErrorResponse) => {
          this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
        });
  }

  verifier2(id) {
    let c = confirm("هل أنت فعلاً موافق");
    this.authservice.supprimercandidaturebrouillon(id)
      .subscribe(
        (data: any) => {
          console.log('success');
          this.ngOnInit();
        },
        (err: HttpErrorResponse) => {
          this.presentAlert('', err.message);
        });
  }
  changercouleur(id) {
    return id;
  }

  affecternoirbadgejaune() {
    const matches = document.querySelectorAll("ion-badge[color='warning']");
    matches.forEach(function (userItem) {
      userItem.setAttribute('color', 'black');
    });
  }
}
