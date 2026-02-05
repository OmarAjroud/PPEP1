import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Candidature } from '../logic/candidature.model';
export class Scoring {
  id: number;
  variable: number;
  value: number;
  response: number;

}
@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {
  rootUrl = "http://inscription.atfp.tn:8080/";
  constructor(private http: HttpClient) {

  }
  candidature: Candidature;
  login(credentials) {

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });


    return this.http.post(this.rootUrl + "api/login_check", JSON.stringify(credentials), { headers: reqHeader });

  }


  getuser(): Observable<any> {

    var r = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r.append('Content-Type', 'application/json; charset=utf-8');
    r.append('Access-Control-Allow-Origin', '*');



    return this.http.get(this.rootUrl + "api/candidate/profile", { headers: r });
  }

  getscore(): Observable<any> {

    var r = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r.append('Content-Type', 'application/json; charset=utf-8');
    r.append('Access-Control-Allow-Origin', '*');



    return this.http.get(this.rootUrl + "api/candidate/scoringFormCandidate/create", { headers: r });
  }

  updatepersonnel(tel, adresse, codepostal): Observable<any> {
    var r1 = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r1.append('Content-Type', 'file; charset=utf-8');
    r1.append('Access-Control-Allow-Origin', '*');
    const formData = new FormData();
    formData.append('donnee_personnelle[TelMobile]', "" + tel + "");
    formData.append('donnee_personnelle[CodePostal]', "" + codepostal + "");
    //formData.append('credential[email]', "" + email + "");
    formData.append('donnee_personnelle[Adresse]', "" + adresse + "");
    return this.http.post(this.rootUrl + "api/profile/updateDonneepersonnel", formData, { headers: r1 });
  }

  updateemail(email): Observable<any> {
    var r1 = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r1.append('Content-Type', 'file; charset=utf-8');
    r1.append('Access-Control-Allow-Origin', '*');
    const formData = new FormData();

    formData.append('Cridential[email]', "" + email + "");

    return this.http.post(this.rootUrl + "api/profile/updateCredential", formData, { headers: r1 });
  }



  updatebulletin(idbulletin, fichier, tableau: Scoring[]): Observable<any> {
    var r1 = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r1.append('Content-Type', 'file; charset=utf-8');
    r1.append('Access-Control-Allow-Origin', '*');
    console.log(JSON.stringify(tableau));
    const formData = new FormData();
    formData.append('id', idbulletin);
    formData.append('file', fichier);
    for (let i = 0; i < tableau.length; i++) {
      let Array = [7, 8, 9, 10, 11];
      let score: Scoring = tableau[i];


      if (!Array.includes(i) && (score.value != null)) {
        formData.append('scoringFormViewItems[' + i + '][id]', "" + score.id + "");
        formData.append('scoringFormViewItems[' + i + '][variable]', "" + score.variable + "");
        formData.append('scoringFormViewItems[' + i + '][value]', "" + score.value + "");
      }
      if (Array.includes(i)) {
        formData.append('scoringFormViewItems[' + i + '][id]', "" + score.id + "");
        formData.append('scoringFormViewItems[' + i + '][variable]', "" + score.variable + "");
        if (score.value != null)
          formData.append('scoringFormViewItems[' + i + '][value]', "" + score.value + "");
        else
          formData.append('scoringFormViewItems[' + i + '][value]', "" + score.response + "");
        formData.append('scoringFormViewItems[' + i + '][response]', "" + score.response + "");
      }
    }
    //formData.append('scoringFormViewItems', data1);



    return this.http.post(this.rootUrl + "api/candidate/scoringFormCandidate/update/" + idbulletin, formData, { headers: r1 });
  }



  getnotifications(): Observable<any> {

    var r = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r.append('Content-Type', 'application/json; charset=utf-8');
    r.append('Access-Control-Allow-Origin', '*');


    console.log(r.get('Authorization'));

    return this.http.get(this.rootUrl + "api/notifications", { headers: r });
  }

  getoffres(): Observable<any> {

    var r = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r.append('Content-Type', 'application/json; charset=utf-8');
    r.append('Access-Control-Allow-Origin', '*');


    console.log(r.get('Authorization'));

    return this.http.get(this.rootUrl + "api/candidate/candidatures/historique", { headers: r });
  }
  getgov(): Observable<any> {

    var r = new HttpHeaders();
    r.append('Content-Type', 'application/json; charset=utf-8');
    r.append('Access-Control-Allow-Origin', '*');


    console.log(r.get('Authorization'));

    return this.http.get(this.rootUrl + "public/gouvernorats", { headers: r });
  }


  approuvercandidature(id): Observable<any> {

    var r = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r.append('Content-Type', 'application/json; charset=utf-8');
    r.append('Access-Control-Allow-Origin', '*');


    console.log(r.get('Authorization'));

    return this.http.get(this.rootUrl + "api/candidate/approve/candidature/" + id, { headers: r });
  }
  approuvercandidaturebrouillon(idoffre): Observable<any> {

    var r = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r.append('Content-Type', 'application/json; charset=utf-8');
    r.append('Access-Control-Allow-Origin', '*');

    const formData = new FormData();
    console.log(r.get('Authorization'));
    this.candidature = new Candidature();
    this.candidature.candidatures = [];
    this.candidature.candidatures.push(idoffre);
    console.log(JSON.stringify(this.candidature));
    // const p = "{\'candidatures' : \' " + JSON.stringify(candidatures)+"\' }";
    return this.http.post(this.rootUrl + "api/candidate/candidature/validateMany", JSON.stringify(this.candidature), { headers: r });
  }

  supprimercandidaturebrouillon(idoffre): Observable<any> {

    var r = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r.append('Content-Type', 'application/json; charset=utf-8');
    r.append('Access-Control-Allow-Origin', '*');

    const formData = new FormData();
    console.log(r.get('suppression candidature '));

    return this.http.delete(this.rootUrl + "api/candidate/candidature/offre/" + idoffre, { headers: r });
  }

  getoffreschoix(s, c, o, st, le): Observable<any> {
    var r = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r.append('Content-Type', 'application/json; charset=utf-8');
    r.append('Access-Control-Allow-Origin', '*');



    // let urlSearchParams = new URLSearchParams();
    // urlSearchParams.append('specialite_refIn', s);
    // urlSearchParams.append('centre_refIn', c);
    // urlSearchParams.append('lowerOffre', o);
    // urlSearchParams.append('gouvernorat_refIn', g);
    // urlSearchParams.append('start', st);
    // urlSearchParams.append('length', le);

    const p1 = new HttpParams()
      .set('specialite_refIn', s)
      .set('centre_refIn', c)
      .set('lowerOffre', o)
      .set('start', st)
      .set('length', le)

    const p2 = new HttpParams()
      .set('specialite_refIn', s)
      .set('lowerOffre', o)
      .set('start', st)
      .set('length', le)

    const p3 = new HttpParams()
      .set('centre_refIn', c)
      .set('lowerOffre', o)
      .set('start', st)
      .set('length', le)

    console.log(JSON.stringify(p1));
    console.log(JSON.stringify(p2));
    console.log(JSON.stringify(p3));

    if (c && s)
      return this.http.post(this.rootUrl + "api/offres", null, { 'params': p1, headers: r });
    else if (c == undefined)
      return this.http.post(this.rootUrl + "api/offres", null, { 'params': p2, headers: r });
    else
      return this.http.post(this.rootUrl + "api/offres", null, { 'params': p3, headers: r });


  }

  createcandidature(offre): Observable<any> {
    var r1 = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r1.append('Content-Type', 'application/json; charset=utf-8');
    r1.append('Access-Control-Allow-Origin', '*');
    console.log(offre);

    const formData = new FormData();
    formData.append('candidature[offre]', offre);
    const p1 = new HttpParams()
      .set("candidature[offre]", offre)


    console.log('ppppppppppppp' + p1);
    return this.http.post(this.rootUrl + "api/candidate/candidature/create", formData, { 'params': p1, headers: r1 });
  }

  getImage(imageUrl: string): Observable<any> {

    var r = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('usertoken') });
    r.append('Access-Control-Allow-Origin', '*');
    r.append('Content-Type', 'text/html; charset=utf-8');



    return this.http.get(this.rootUrl + "bo/candidature/detail/scoring/image/" + imageUrl, { headers: r });
  }

}