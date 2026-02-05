import { Component, OnInit, TestabilityRegistry, Renderer2 } from '@angular/core';
import { GlobalsService } from '../../globals.service';
import { AuthServiceService } from '../../sevices/auth-service.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertController, MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

import { Router } from '@angular/router';
import { ProfileModel } from '../../logic/Profile.model';
import { RegistrationService } from './../../registration/registration.service';
export class An {
  id: number;
}
export class Niveau {
  id: string;
  libelle_Ar: string;
  libelle_En: string;
  created: string;
  updated: string;
}
export class Diplome {
  id: string;
  libelle_Ar: string;
  libelle_En: string;
  created: string;
  updated: string;
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

export class SpecialiteScolaire {
  id: string;
  libelle_Ar: string;
  libelle_En: string;
  created: string;
  updated: string;
}
export class Gouvernorat {
  id: string;
  libelle_Ar: string;
  libelle_Fr: string;
  libelle_En: string;
  created: string;
  updated: string;
}
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  first: any; second: any;
  Annee: number;
  s1: any;
  mm: any;
  ExtraitDeNaissance: any;
  Adresse: any; CodePostal: any; TelFix: any; TelMobile: any; selectedCodeValuedel1: any;
  del1: any; email1: any; selectedCodeValue: any;
  ancienneFormationNiveau: any; ancienneFormationDiplome: any; specF: any; Etablissement: any; anp: any;
  ancienneFormationDiplomef: any; specialitesAncienneFormationModel: any; CentreAncienneFormationModel: any;
  anp1: any; livreeLe: any; DateNaissance: any;
  govs: Gouvernorat[] = [];
  niveaux: Niveau[] = [];
  niveau: Niveau = new Niveau();
  diplome: Diplome = new Diplome();
  diplomes: Diplome[] = [];
  diplomef: DiplomeF = new DiplomeF();
  diplomesf: DiplomeF[] = [];
  gov: Gouvernorat = new Gouvernorat();
  delegation: any;
  municippalite: any;
  delegations1: any[] = [];
  municipalites: any[] = [];
  an: An = new An();
  annee: An[] = [];
  anneebirth: An[] = [];
  anneeactuelleint: number;
  specialiteScolaire: SpecialiteScolaire = new SpecialiteScolaire();
  spcialitescoloaires: SpecialiteScolaire[] = [];
  centresspec: any[] = [];
  spcialitescoloairesaf: any[] = [];
  emailincorrecte: boolean;
  emailutilise: boolean;
  naissanceincorrecte: boolean;
  NumInscription: number;
  nomAincorrecte: boolean;
  prenomAincorrecte: boolean;
  cininvalide: boolean;
  telfixinvalide: boolean;
  telmobileinvalide: boolean;
  nomfrinvalide: boolean;
  prenomfrinvalide: boolean;
  secondincorrecte: boolean;
  codeinvalide: boolean;
  notaffichagesoc: boolean;
  formation: string;
  card2: boolean;
  card3: boolean;
  card4: boolean;
  nommathmoun: string;
  mathmounmagboul: boolean;
  mathmounnonmagboul: boolean;
  taillemathmoun: string;
  codepostal: boolean;
  profilem: ProfileModel = new ProfileModel();
  etabtype: string;
  sex: string;
  nomAr: string;
  prenomAr: string;
  cin: string;
  maxdatebirth: string;

  constructor(private g: GlobalsService, private authservice: AuthServiceService, private renderer: Renderer2, private router: Router,
    private registration: RegistrationService, private platform: Platform,
    public alertCtrl: AlertController, public alertCtrl1: AlertController, public reservation: RegistrationService) { }


  ngOnInit() {
    this.initializeApp();
    var s = new Date();
    let y: number = s.getFullYear() - 15;

    this.maxdatebirth = y + "-01-01T00:00:00";
    //alert(this.maxdatebirth);
    this.etabtype = "public";
    this.sex = "male";
    this.nomAr = "";
    this.prenomAr = "";
    this.cin = null;
    this.nomAincorrecte = false;
    this.prenomAincorrecte = false;
    this.cininvalide = false;
    let i: number;
    this.anneeactuelleint = new Date().getFullYear();
    for (i = this.anneeactuelleint - 40; i <= this.anneeactuelleint; i++) {
      this.an = new An();
      this.an.id = i;
      this.annee.push(this.an);
    }

    for (i = this.anneeactuelleint - 60; i <= this.anneeactuelleint; i++) {
      this.an = new An();
      this.an.id = i;
      this.anneebirth.push(this.an);
    }

    this.g.checkConnection();
    if (this.g.connectedtointernet == false) {
      this.presentAlert("info", "أنت غير متصل بالإنترنت");
      this.router.navigate(['/login']);

    }
    else {

      this.authservice.getgov()
        .subscribe(
          (data: any) => {
            console.log('success');


            this.govs = data;

          },
          (err: HttpErrorResponse) => {


            this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
          });

      this.registration.getAllDeplomes()
        .subscribe(
          (data: any) => {
            console.log('success');


            this.diplomes = data;

          },
          (err: HttpErrorResponse) => {


            this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
          });


      this.registration.getAllDeplomesFomation()
        .subscribe(
          (data: any) => {
            console.log('success');


            this.diplomesf = data;

          },
          (err: HttpErrorResponse) => {


            this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
          });


      this.registration.getAllNiveauxScolaire()
        .subscribe(
          (data: any) => {
            console.log('success');


            this.niveaux = data;

          },
          (err: HttpErrorResponse) => {


            this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
          });

      this.registration.getAllSpecialites()
        .subscribe(
          (data: any) => {
            console.log('success');


            this.spcialitescoloaires = data;

          },
          (err: HttpErrorResponse) => {


            this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
          });


    }

  }
  async presentAlert(title: string, message: string) {


    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: title,
      message: message,
      buttons: ['OK'],

    });

    await alert.present();
  }
  compareWithFn = (o1: { id: any; }, o2: { id: any; }) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;


  chercherdelegation(id: any) {
    this.registration.getDelegationByGouvernoratId(id)
      .subscribe(
        (data: any) => {
          console.log('success');


          this.delegations1 = data;
          this.notaffichagesoc = false;

        },
        (err: HttpErrorResponse) => {


          this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
        });
  }

  chercherm(id: any) {
    this.registration.getMunicipaliteByGouvernoratId(id)
      .subscribe(
        (data: any) => {
          console.log('success');


          this.municipalites = data;

        },
        (err: HttpErrorResponse) => {


          this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
        });
  }



  cherchersaf(id: any) {
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

  cherchercentrespec(id: any) {

    this.registration.getAllCentresBySpecialite(id)
      .subscribe(
        (data: any) => {
          console.log('success');


          this.centresspec = data;

        },
        (err: HttpErrorResponse) => {


          this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
        });
  }

  checkmailH(id: string) {
    if (this.validateEmail(id)) {
      this.emailincorrecte = false;
      this.registration.checkEmail(id)
        .subscribe(
          (data: any) => {
            console.log('success');
            if (data.exist) {
              this.presentAlert('', "هذا البريد الإلكتروني مستخدم من قبل");
              this.emailutilise = true;
            }
            else {
              console.log('',
                " هذا البريد الإلكتروني صحيح ولم يتم استخدامه من قبل"
              );
              this.emailutilise = false;
            }
          },
          (err: HttpErrorResponse) => {


            this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
          });
    }
    else
      this.emailincorrecte = true;
  }

  checknomA(nom: any) {
    if (this.validatearabic(nom))
      this.nomAincorrecte = false;
    else
      this.nomAincorrecte = true;
  }
  checkprenomA(nom: any) {
    if (this.validatearabic(nom))
      this.prenomAincorrecte = false;
    else
      this.prenomAincorrecte = true;
  }
  checkcin(nom: string) {

    if ((this.validatenumbercin(nom)) || nom == null) {


      this.cininvalide = false;
    }

    else {
      this.cininvalide = true;
      alert("t" + nom + "t");
    }
  }
  checknomfr(nom: any) {
    if (this.validatefr(nom))
      this.nomfrinvalide = false;
    else
      this.nomfrinvalide = true;
  }
  checkprenomfr(nom: any) {
    if (this.validatefr(nom))
      this.prenomfrinvalide = false;
    else
      this.prenomfrinvalide = true;
  }
  checktelfix(nom: string) {
    if ((this.validatenumbercin(nom)) || (nom == "") || (nom == " ") || (nom == null)) {
      this.telfixinvalide = false;

    }
    else {
      this.telfixinvalide = true;
      this.renderer.selectRootElement('#telfix').focus();
    }
  }
  checktelmobile(nom: any) {
    if (this.validatenumbercin(nom)) {
      this.telmobileinvalide = false;
    }
    else {
      this.telmobileinvalide = true;

      this.renderer.selectRootElement('#telmobile').focus();
    }
  }
  checkcodebirth(code: any) {
    if (this.validatenumber(code))
      this.codeinvalide = false;
    else
      this.codeinvalide = true;
  }
  checkcodepostal(code: any) {
    if (this.validatenumber(code))
      this.codepostal = false;
    else
      this.codepostal = true;
  }

  validateEmail(email: any) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validatearabic(text: any) {
    var arregex = /[\u0600-\u06FF]/;
    return arregex.test(String(text).toLowerCase());
  }
  validatenumbercin(text: any) {
    var arregex = /^[0-9]{8}$/;
    return arregex.test(String(text).toLowerCase());
  }
  validatenumber(text: any) {
    var arregex = /^[0-9]{1,}$/;
    return arregex.test(String(text).toLowerCase());
  }
  validatefr(text: any) {
    var arregex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

    return arregex.test(String(text).toLowerCase());
  }
  checkbirth(NumInscription: any, mm: any, Annee: any) {

    this.registration.checkIdentifiant(Annee, NumInscription, mm)
      .subscribe(
        (data: any) => {
          console.log('success');
          if (data.exist) {
            this.presentAlert('',

              " تحقق من ولادتك: السنة ، الرمز والبلدية"
            );

            this.naissanceincorrecte = true;
            this.NumInscription = 0;
          }
          else {
            console.log('',
              " هذا البريد الإلكتروني صحيح ولم يتم استخدامه من قبل"
            );
            this.naissanceincorrecte = false;
          }

        },
        (err: HttpErrorResponse) => {


          this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
        });

  }
  checksecond(s1: any, s2: any) {
    if (s1 == s2)
      this.secondincorrecte = false;
    else
      this.secondincorrecte = true;
  }
  checksecond1() {

    this.secondincorrecte = false;
  }
  affichercard2() {
    this.card2 = true;
  }
  affichercard3() {
    this.card3 = true;
  }
  affichercard4() {
    this.card4 = true;
  }


  onSubmit(p: { nomAr: string; prenomAr: string; email: string; first: string; second: string; cin: string; an: string; deplome: string; speciality: string; etablisment: string; livreeLe: string; Annee: number; NumInscription: number; Municipalite: string; Adresse: string; TelFixe: string; TelMobile: number; Gouvernorat: string; Delegation: string; DateNaissance: string; CodePostal: number; AnneeAbandonScolaire: string; NiveauScolaire: string; specialitesAncienneFormationModel: number; ancienneFormationDiplomef: number; CentreAncienneFormationModel: number; anneefinformation: number; }) {

    /*      credentials of profile modele      */
    this.profilem.credential.nom = p.nomAr;
    this.profilem.credential.nomAr = p.nomAr;
    this.profilem.credential.prenom = p.prenomAr;
    this.profilem.credential.prenomAr = p.prenomAr;
    this.profilem.credential.email = p.email;
    this.profilem.credential.plainPassword.first = p.first;
    this.profilem.credential.plainPassword.second = p.second;
    this.profilem.credential.cin = p.cin;
    this.profilem.credential.deliveredAt = p.an;
    this.profilem.credential.deplome = p.deplome;
    this.profilem.credential.speciality = p.speciality;
    this.profilem.credential.etablisment = p.etablisment;

    this.profilem.credential.etablismenttype = this.etabtype;
    this.profilem.credential.livreeLe = p.livreeLe;

    /*    extrait of profile modele        */
    this.profilem.extrait.Annee = p.Annee;
    this.profilem.extrait.NumInscription = p.NumInscription;
    this.profilem.extrait.Municipalite = p.Municipalite;


    /*    Donnee  of profile modele        */

    this.profilem.donnee.Genre = this.sex;
    this.profilem.donnee.Adresse = p.Adresse;
    this.profilem.donnee.TelFixe = p.TelFixe;
    this.profilem.donnee.TelMobile = p.TelMobile;
    this.profilem.donnee.Gouvernorat = p.Gouvernorat;
    this.profilem.donnee.Delegation = p.Delegation;
    this.profilem.donnee.DateNaissance = p.DateNaissance;
    this.profilem.donnee.CodePostal = p.CodePostal;
    this.profilem.donnee.Municipalite = null;
    this.profilem.donnee.deplome = p.deplome;


    /*    formation  of profile modele        */
    this.profilem.formation.Etablissement = p.etablisment;
    this.profilem.formation.TypeEtablissement = this.etabtype;
    this.profilem.formation.AnneeAbandonScolaire = p.AnneeAbandonScolaire;
    this.profilem.formation.NiveauScolaire = p.NiveauScolaire;
    this.profilem.formation.deplome = p.deplome;
    this.profilem.formation.speciality = p.speciality;
    this.profilem.formation.center = null;
    this.profilem.formation.finishyear = p.AnneeAbandonScolaire;


    /*    Ancienne formation  of profile modele        */
    if (this.formation) {
      this.profilem.ancienneFormation.Specialite = p.specialitesAncienneFormationModel;
      this.profilem.ancienneFormation.diplome = p.ancienneFormationDiplomef;
      this.profilem.ancienneFormation.Centre = p.CentreAncienneFormationModel;
      this.profilem.ancienneFormation.anneeFin = p.anneefinformation;
    }

    console.log(JSON.stringify(this.profilem.credential));
    console.log(JSON.stringify(this.profilem.extrait));
    console.log(JSON.stringify(this.profilem.donnee));
    console.log(JSON.stringify(this.profilem.formation));
    console.log(JSON.stringify(this.profilem.ancienneFormation));

    if (this.g.connectedtointernet == false) {
      this.presentAlert("info", "أنت غير متصل بالإنترنت");
      this.router.navigate(['/login']);

    }
    else {
      this.reservation.registrate(this.profilem).subscribe(
        (data: any) => {
          if (data.credential) {
            this.presentAlert('', "تم التسجيل بنجاح" + data.credential.username);
          }
          else {
            this.presentAlert('', "الرجاء التثبت من المعطيات ");
            console.log(JSON.stringify(data))
          }

        },
        (err: HttpErrorResponse) => {
          this.presentAlert('', "لا يمكن الوصول لموقع التسجيل عن بعد");
        });

    }
  }


  selected1(value: string) {
    this.etabtype = value;
  }
  selected2(value: string) {
    this.sex = value;
  }

  changeListener($event): void {
    this.profilem.extrait.ExtraitDeNaissance = $event.target.files[0];



    var fileLimit = 2048; // could be whatever you want 
    var fileSize = $event.target.files[0].size;
    var fileSizeInKB = (fileSize / 1024); // this would be in kilobytes defaults to bytes

    if (fileSizeInKB < fileLimit) {
      this.mathmounmagboul = true;
      this.mathmounnonmagboul = false;
      this.nommathmoun = this.profilem.extrait.ExtraitDeNaissance.name;
    } else {
      this.mathmounmagboul = false;

      this.mathmounnonmagboul = true;
      this.taillemathmoun = fileSizeInKB + ">إثنان megabyte";
      // do not pass go, do not add to db. Pass error to user    
    }

  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('hello');
        }, false);
      });
      console.log("default")
    });
  }
}
