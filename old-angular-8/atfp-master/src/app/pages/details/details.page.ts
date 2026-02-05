import { Component, OnInit, Renderer2 } from '@angular/core';
import { GlobalsService } from '../../globals.service';
import { AuthServiceService } from '../../sevices/auth-service.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistrationService } from './../../registration/registration.service';

declare const require: any;
export class Niveau {
  id: number;
  libelle_Ar: string;
  libelle_Fr: string;
  libelle_En: string;
}

export class Scoring {
  id: number;
  variable: number;
  value: number;
  response: number;

}

export class Annee {
  id: number;
  libelle_Ar: string;
  libelle_Fr: string;
  libelle_En: string;
}


export class Section {
  id: number;
  libelle_Ar: string;
  libelle_Fr: string;
  libelle_En: string;
}
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit {
  nommathmoun: any;
  bulletinhtml: any;
  onSubmit: any;
  onSubmit1: any;
  login: string; password: string;
  msgH: string;
  tk: string;
  bulletinaffichage: boolean = false;
  donneesperso: boolean = false;
  messagebody: string;
  subject: string;
  sexe: boolean;
  etablissement: number;
  discipline: number;
  checknote1: boolean = true;
  checknote2: boolean = true;
  checknote3: boolean = true;
  checknote4: boolean = true;
  checknote5: boolean = true;
  checknote6: boolean = true;
  checknote7: boolean = true;
  checknote8: boolean = true;
  checknote9: boolean = true;
  emailincorrecte: boolean;
  emailutilise: boolean;
  telmobileinvalide: boolean;
  codepostal: boolean;
  Annediplome: string;
  sectionscoliaire: string
  scoringform: any;
  bulletinok: boolean;
  bulletinnotok: boolean;
  nombulletin: string;
  taillebulletin: string;
  NiveauScolaire: string;
  NiveauScolairechoisi: number;
  SectionScolairechoisi: number;

  note1: number;
  note2: number;
  note3: number;
  note4: number;
  note5: number;
  note6: number;
  note7: number;
  note8: number;
  note9: number;
  CodePostal: number;
  adresseemail: string;
  TelMobile: number;
  Adresse: string;

  niveaux: Niveau[];

  urlimage: string;
  niveau: Niveau = new Niveau();

  sections: Section[];

  section: Section = new Section();

  anneediplome: Annee[];
  annee: Annee = new Annee();

  scoring: Scoring = new Scoring();

  scoringFormViewItems: Scoring[] = new Array(14);

  bulletin: File;
  niveauscolaire: number;

  annediplomechoisi: number;
  urlbulletin: string;
  constructor(public g: GlobalsService, private renderer: Renderer2, public registration: RegistrationService, private router: Router, private authservice: AuthServiceService, public alertCtrl: AlertController, public alertCtrl1: AlertController) {


  }

  ngOnInit() {

    this.sections = [
      {
        "libelle_Ar": "الرياضيات",
        "libelle_Fr": "Math",
        "libelle_En": "Math",
        "id": 6
      },
      {
        "id": 7,
        "libelle_Ar": "علوم تجريبية",
        "libelle_Fr": "science experimental",
        "libelle_En": "science experimental"
      },
      {
        "id": 8,
        "libelle_Ar": "إعلامية",
        "libelle_Fr": "informatique",
        "libelle_En": "informatique"
      },
      {
        "id": 9,
        "libelle_Ar": "علوم تقنية",
        "libelle_Fr": "techniques",
        "libelle_En": "techniques"
      },
      {
        "id": 10,
        "libelle_Ar": "آداب",
        "libelle_Fr": "lettre",
        "libelle_En": "lettre"
      },
      {
        "id": 11,
        "libelle_Ar": "إقتصاد و تصرف",
        "libelle_Fr": "économie et gestion",
        "libelle_En": "économie et gestion"
      },
      {
        "id": 21,
        "libelle_Ar": "الرياضة",
        "libelle_Fr": "sport",
        "libelle_En": "sport"
      }
    ];
    this.niveaux = [
      {
        "id": 3,
        "libelle_Ar": "الثانية منهاة",
        "libelle_Fr": "deuxième année secondaire terminé",
        "libelle_En": "deuxième année secondaire terminé",
      },
      {
        "id": 4,
        "libelle_Ar": "الثالثة",
        "libelle_Fr": "troisième année secondaire",
        "libelle_En": "troisième année secondaire",
      },
      {
        "libelle_Ar": "الرابعة",
        "libelle_Fr": "quatrième année secondaire",
        "libelle_En": "quatrième année secondaire",
        "id": 5,
      },
      {
        "id": 18,
        "libelle_Ar": "التاسعة أساسي منهاة",
        "libelle_Fr": "neuvième année de base terminée",
        "libelle_En": "neuvième année de base terminée",
      },
      {
        "id": 19,
        "libelle_Ar": "الأولى",
        "libelle_Fr": "première année secondaire",
        "libelle_En": "première année secondaire",
      },
      {
        "id": 20,
        "libelle_Ar": "الثانية غير منهاة",
        "libelle_Fr": "deuxième année secondaire non terminée",
        "libelle_En": "deuxième année secondaire non terminée",
      },
      {
        "id": 22,
        "libelle_Ar": "الثانية منهاة فما فوق",
        "libelle_Fr": "plus que deuxième année",
        "libelle_En": "plus que deuxième année",
      }
    ];

    this.anneediplome = [
      {
        "libelle_Ar": "في نفس سنة التسجيل",
        "libelle_Fr": "dans la même année que l'inscription",
        "libelle_En": "dans la même année que l'inscription",
        "id": 14
      },
      {
        "id": 15,
        "libelle_Ar": "قبل سنة التسجيل بسنة",
        "libelle_Fr": "avant l'année de l'insciption d'une année",
        "libelle_En": "avant l'année de l'insciption d'une année"
      },
      {
        "id": 16,
        "libelle_Ar": "قبل سنة التسجيل بسنتين",
        "libelle_Fr": "avant l'année  d'inscription de deux années",
        "libelle_En": "avant l'année  d'inscription de deux années"
      },
      {
        "id": 17,
        "libelle_Ar": "قبل سنة التسجيل باكثر من سنتين",
        "libelle_Fr": "avant l'année d'inscription de plus que deux années",
        "libelle_En": "avant l'année d'inscription de plus que deux années"
      }
    ];


    this.g.checkConnection();
    if (this.g.connectedtointernet == false) {
      this.presentAlert("أنت غير متصل بالإنترنت");
      this.router.navigate(['/login']);

    }
    this.chargernote();
    this.chargerpersonnel();
    //this.chargerniveau();
    this.g.logging();


    if (this.g.sexe == true) {
      this.sexe = true;
      console.log("sexe details masculan " + this.sexe);
    }
    else
      this.sexe = false;
    console.log("sexe details " + this.sexe);
    console.log("email details " + this.g.email);

  }

  async presentAlert(message) {

    this.subject = "";
    this.messagebody = message;
    const alert = await this.alertCtrl.create({
      header: '',
      subHeader: this.subject,
      message: this.messagebody,
      buttons: ['OK'],

    });

    await alert.present();
  }
  testernote(note, id) {
    if (isNaN(note) || note < 0 || note > 20)
      return false;
    else {
      this.scoringFormViewItems[id].value = note;
      return true;
    }
  }



  chargernote() {

    this.authservice.getscore()
      .subscribe(
        (data: any) => {
          console.log(JSON.stringify(data));

          this.scoringform = data;
          // alert(this.scoringform.id);
          // alert(this.scoringform.file);
          this.scoringFormViewItems[8] = new Scoring();
          this.scoringFormViewItems[8].id = data.scoringFormViewItems[8].id;
          this.scoringFormViewItems[8].variable = data.scoringFormViewItems[8].variable.id;
          if (data.scoringFormViewItems[8].value != null) {
            this.NiveauScolairechoisi = data.scoringFormViewItems[8].response.id;
            console.log(this.NiveauScolairechoisi);
            this.NiveauScolaire = JSON.stringify(this.NiveauScolairechoisi);
          }


          this.scoringFormViewItems[8].value = 20;
          this.scoringFormViewItems[8].response = this.NiveauScolairechoisi;
          // for (let i = 0; i < this.niveaux.length; i++)
          //   if (this.niveaux[i].id == this.NiveauScolairechoisi) {
          //     this.niveaux[i].selected = "true"; break;
          //   }

          if (data.scoringFormViewItems[9].response != null)
            this.SectionScolairechoisi = data.scoringFormViewItems[9].response.id;
          else
            this.SectionScolairechoisi = null;

          this.scoringFormViewItems[9] = new Scoring();
          this.scoringFormViewItems[9].id = data.scoringFormViewItems[9].id;
          this.scoringFormViewItems[9].variable = data.scoringFormViewItems[9].variable.id;
          this.scoringFormViewItems[9].value = this.SectionScolairechoisi;
          this.scoringFormViewItems[9].response = this.SectionScolairechoisi;


          this.sectionscoliaire = JSON.stringify(this.SectionScolairechoisi);

          if (data.scoringFormViewItems[11].response != null)
            this.annediplomechoisi = data.scoringFormViewItems[11].response.id;
          else
            this.annediplomechoisi = null;

          this.Annediplome = JSON.stringify(this.annediplomechoisi);
          this.scoringFormViewItems[11] = new Scoring();
          this.scoringFormViewItems[11].id = data.scoringFormViewItems[11].id;
          this.scoringFormViewItems[11].variable = data.scoringFormViewItems[11].variable.id;
          this.scoringFormViewItems[11].value = this.annediplomechoisi;
          this.scoringFormViewItems[11].response = this.annediplomechoisi;

          if (data.scoringFormViewItems[0].value != null) {
            this.note1 = data.scoringFormViewItems[0].value
          }
          else
            this.note1 = null;
          this.scoringFormViewItems[0] = new Scoring();
          this.scoringFormViewItems[0].id = data.scoringFormViewItems[0].id;
          this.scoringFormViewItems[0].variable = data.scoringFormViewItems[0].variable.id;
          this.scoringFormViewItems[0].value = this.note1;


          if (data.scoringFormViewItems[1].value != null) {
            this.note2 = data.scoringFormViewItems[1].value
          }
          else
            this.note2 = null;

          this.scoringFormViewItems[1] = new Scoring();
          this.scoringFormViewItems[1].id = data.scoringFormViewItems[1].id;
          this.scoringFormViewItems[1].variable = data.scoringFormViewItems[1].variable.id;
          this.scoringFormViewItems[1].value = this.note2;


          if (data.scoringFormViewItems[2].value != null) {
            this.note3 = data.scoringFormViewItems[2].value
          }
          else
            this.note3 = null;
          this.scoringFormViewItems[2] = new Scoring();
          this.scoringFormViewItems[2].id = data.scoringFormViewItems[2].id;
          this.scoringFormViewItems[2].variable = data.scoringFormViewItems[2].variable.id;
          this.scoringFormViewItems[2].value = this.note3;


          if (data.scoringFormViewItems[3].value != null) {
            this.note4 = data.scoringFormViewItems[3].value
          }
          else
            this.note4 = null;
          this.scoringFormViewItems[3] = new Scoring();
          this.scoringFormViewItems[3].id = data.scoringFormViewItems[3].id;
          this.scoringFormViewItems[3].variable = data.scoringFormViewItems[3].variable.id;
          this.scoringFormViewItems[3].value = this.note4;

          if (data.scoringFormViewItems[4].value != null) {
            this.note5 = data.scoringFormViewItems[4].value
          }
          else
            this.note5 = null;

          this.scoringFormViewItems[4] = new Scoring();
          this.scoringFormViewItems[4].id = data.scoringFormViewItems[4].id;
          this.scoringFormViewItems[4].variable = data.scoringFormViewItems[4].variable.id;
          this.scoringFormViewItems[4].value = this.note5;


          if (data.scoringFormViewItems[5].value != null) {
            this.note6 = data.scoringFormViewItems[5].value
          }
          else
            this.note6 = null;
          this.scoringFormViewItems[5] = new Scoring();
          this.scoringFormViewItems[5].id = data.scoringFormViewItems[5].id;
          this.scoringFormViewItems[5].variable = data.scoringFormViewItems[5].variable.id;
          this.scoringFormViewItems[5].value = this.note6;


          if (data.scoringFormViewItems[6].value != null) {
            this.note7 = data.scoringFormViewItems[6].value
          }
          else
            this.note7 = null;
          this.scoringFormViewItems[6] = new Scoring();
          this.scoringFormViewItems[6].id = data.scoringFormViewItems[6].id;
          this.scoringFormViewItems[6].variable = data.scoringFormViewItems[6].variable.id;
          this.scoringFormViewItems[6].value = this.note7;


          if (data.scoringFormViewItems[12].value != null) {
            this.note8 = data.scoringFormViewItems[12].value
          }
          else
            this.note8 = null;
          this.scoringFormViewItems[12] = new Scoring();
          this.scoringFormViewItems[12].id = data.scoringFormViewItems[12].id;
          this.scoringFormViewItems[12].variable = data.scoringFormViewItems[12].variable.id;
          this.scoringFormViewItems[12].value = this.note8;


          if (data.scoringFormViewItems[13].value != null) {
            this.note9 = data.scoringFormViewItems[13].value
          }
          else
            this.note9 = null;
          this.scoringFormViewItems[13] = new Scoring();
          this.scoringFormViewItems[13].id = data.scoringFormViewItems[13].id;
          this.scoringFormViewItems[13].variable = data.scoringFormViewItems[13].variable.id;
          this.scoringFormViewItems[13].value = this.note9;


          this.etablissement = null;

          let etab = null;
          if (data.scoringFormViewItems[7].response != null) {
            etab = data.scoringFormViewItems[7].response.id;
            this.etablissement = etab - 1;
          }

          this.scoringFormViewItems[7] = new Scoring();
          this.scoringFormViewItems[7].id = data.scoringFormViewItems[7].id;
          this.scoringFormViewItems[7].variable = data.scoringFormViewItems[7].variable.id;
          if (etab) {
            this.scoringFormViewItems[7].value = 1;
            this.scoringFormViewItems[7].response = etab;
          }

          else {
            this.scoringFormViewItems[7].value = null;
            this.scoringFormViewItems[7].response = null;
          }


          let disp = null;
          if (data.scoringFormViewItems[10].response) {
            disp = data.scoringFormViewItems[10].response.id;
          }


          this.scoringFormViewItems[10] = new Scoring();
          this.scoringFormViewItems[10].id = data.scoringFormViewItems[10].id;
          this.scoringFormViewItems[10].variable = data.scoringFormViewItems[10].variable.id;
          if (disp != null) {
            this.scoringFormViewItems[10].value = disp;
            this.scoringFormViewItems[10].response = disp;
          }
          else {
            this.scoringFormViewItems[10].value = null;
            this.scoringFormViewItems[10].response = null;
          }
          if (disp != null) {
            if (disp == 13)
              this.discipline = 0;
            else
              this.discipline = 1;


          }
        }
        ,
        (err: HttpErrorResponse) => {


          this.presentAlert(err.message);
        });
    // this.afficherbulletindepart();

  }

  chargerniveau() {

    this.registration.getAllNiveauxScolaire()
      .subscribe(
        (data: any) => {
          console.log('success');


          this.niveaux = data;

        },
        (err: HttpErrorResponse) => {


          this.presentAlert("لا يمكن الوصول لموقع التسجيل عن بعد");
        });
  }
  changeListener($event): void {
    this.bulletin = $event.target.files[0];



    var fileLimit = 2048; // could be whatever you want 
    var fileSize = $event.target.files[0].size;
    var fileSizeInKB = (fileSize / 1024); // this would be in kilobytes defaults to bytes

    if (fileSizeInKB < fileLimit) {
      this.bulletinok = true;
      this.bulletinnotok = false;
      this.nombulletin = this.bulletin.name;



      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.urlbulletin = event.target.result;
      };

      reader.onerror = (event: any) => {
        console.log("File could not be read: " + event.target.error.code);
      };

      reader.readAsDataURL($event.target.files[0]);



    } else {
      this.bulletinok = false;

      this.bulletinnotok = true;
      this.taillebulletin = fileSizeInKB + ">إثنان megabyte";
      // do not pass go, do not add to db. Pass error to user    
    }

  }

  afficherbulletindepart() {
    //<img class="img-fluid" aria - orientation="horizontal" src = "http://41.231.253.195:8080/bo/candidature/detail/scoring/image/260674" >

    // window.open("http://41.231.253.195:8080/bo/candidature/detail/scoring/image/260674", '_system', 'location=yes');



    this.authservice.getImage("260674")
      .subscribe(
        (data: any) => {
          console.log('success');


          this.createImageFromBlob(data);
          console.log(data);


        },
        (err: HttpErrorResponse) => {


          this.presentAlert("لا يمكن الوصول لموقع التسجيل عن بعد");
        });



  }

  updatebulletin() {
    let id = this.scoringform.id;
    let file = this.bulletin;
    let data1 = this.scoringform.scoringFormViewItems;

    this.authservice.updatebulletin(id, file, this.scoringFormViewItems)
      .subscribe(
        (data: any) => {
          this.presentAlert("تم تحين الأعداد  بنجاح");
        }
        ,
        (err: HttpErrorResponse) => {


          this.presentAlert(err.message);
        });
  }
  imagetoshow: any;
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imagetoshow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  changeretab(ref) {
    console.log('changer discipliene  : ' + ref);
    console.log('nouvelle valeur discipline : ' + this.etablissement);
    console.log(' this.scoringFormViewItems[7].value: ' + this.scoringFormViewItems[7].value);
    if (ref == '0') {


      this.scoringFormViewItems[7].value = 1;
      this.scoringFormViewItems[7].response = 1;

    }
    else {
      this.scoringFormViewItems[7].value = 1;
      this.scoringFormViewItems[7].response = 2;
    }
    console.log(' this.scoringFormViewItems[7].value: ' + this.scoringFormViewItems[7].value);
    console.log(' this.scoringFormViewItems[7].response: ' + this.scoringFormViewItems[7].response);
  }


  changediscipline(refe) {
    console.log('changer discipliene  : ' + refe);
    console.log('nouvelle valeur discipline : ' + this.discipline);
    console.log(' this.scoringFormViewItems[10].value: ' + this.scoringFormViewItems[10].value);
    if (refe == 0) {


      this.scoringFormViewItems[10].response = 13;

    }
    else
      this.scoringFormViewItems[10].response = 12;

    console.log(' this.scoringFormViewItems[10].response: ' + this.scoringFormViewItems[10].response);

  }
  changerniveauscolaire(ref) {
    let ex = this.scoringFormViewItems[8].value;
    console.log(' this.scoringFormViewItems[8].value: ' + this.scoringFormViewItems[8].value);
    console.log("la freference du changment est :" + ref);
    this.scoringFormViewItems[8].value = 20;
    this.scoringFormViewItems[8].response = ref;
    console.log(' this.scoringFormViewItems[8].value: ' + this.scoringFormViewItems[8].value);
    console.log(' this.scoringFormViewItems[8].response: ' + this.scoringFormViewItems[8].response);
  }

  changersectionscoliare(ref) {
    console.log(' this.scoringFormViewItems[8].value: ' + this.scoringFormViewItems[9].value);
    console.log(' this.scoringFormViewItems[8].response: ' + this.scoringFormViewItems[9].response);
    this.scoringFormViewItems[9].response = ref;
    console.log(' this.scoringFormViewItems[8].value: ' + this.scoringFormViewItems[9].value);
    console.log(' this.scoringFormViewItems[8].response: ' + this.scoringFormViewItems[9].response);
  }

  changeranne(ref) {
    console.log(' this.scoringFormViewItems[8].value: ' + this.scoringFormViewItems[11].value);
    console.log(' this.scoringFormViewItems[8].response: ' + this.scoringFormViewItems[11].response);
    this.scoringFormViewItems[11].response = ref;
    console.log(' this.scoringFormViewItems[8].value: ' + this.scoringFormViewItems[11].value);
    console.log(' this.scoringFormViewItems[8].response: ' + this.scoringFormViewItems[11].response);
  }

  afficherbulletin() {
    this.bulletinaffichage = true;
  }
  closebulletin() {
    this.bulletinaffichage = false;
  }

  afficherdonnees() {
    this.donneesperso = true;
    this.chargerpersonnel();
  }
  closedonnees() {
    this.donneesperso = false;
  }

  checkmailH(id) {
    if (this.validateEmail(id)) {
      this.emailincorrecte = false;
      this.registration.checkEmail(id)
        .subscribe(
          (data: any) => {
            console.log('success1');
            if (data.exist) {
              this.presentAlert("هذا البريد الإلكتروني مستخدم من قبل");
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


            this.presentAlert("لا يمكن الوصول لموقع التسجيل عن بعد");
          });
    }
    else
      this.emailincorrecte = true;
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checktelmobile(nom) {
    if (this.validatenumbercin(nom)) {
      this.telmobileinvalide = false;
    }
    else {
      this.telmobileinvalide = true;

      this.renderer.selectRootElement('#telmobile').focus();
    }
  }

  validatenumbercin(text) {
    var arregex = /^[0-9]{8}$/;
    return arregex.test(String(text).toLowerCase());
  }
  checkcodepostal(code) {
    if (this.validatenumber(code))
      this.codepostal = false;
    else
      this.codepostal = true;
  }
  validatenumber(text) {
    var arregex = /^[0-9]{1,}$/;
    return arregex.test(String(text).toLowerCase());
  }
  chargerpersonnel() {

    this.adresseemail = this.g.email;
    this.CodePostal = this.g.codepostal;
    this.TelMobile = this.g.tel;
    this.Adresse = this.g.adresse;
  }

  updatepersonnel(email, tel, adresse, codepostal) {

    this.authservice.updatepersonnel(tel, adresse, codepostal)
      .subscribe(
        (data: any) => {
          this.presentAlert("تم تحين الأعداد  بنجاح");
          console.log(JSON.stringify(data));
        }
        ,
        (err: HttpErrorResponse) => {


          this.presentAlert(err.message);
        });
    this.authservice.updateemail(email)
      .subscribe(
        (data: any) => {
          this.presentAlert("تم تحين الأعداد  بنجاح");
          console.log(JSON.stringify(data));
        }
        ,
        (err: HttpErrorResponse) => {


          this.presentAlert(err.message);
        });
  }
}