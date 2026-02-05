import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthServiceService } from './sevices/auth-service.service';
import { HttpUtilsService } from './sevices/http-utils.service';
import { UtilsService } from './sevices/utils.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHeaderResponse, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TooltipsModule } from 'ionic4-tooltips';

// import firebase
import { FCM } from '@ionic-native/fcm/ngx';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { GlobalsService } from './globals.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode';
import { RegistrationService } from './registration/registration.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MDBBootstrapModule.forRoot()
    , HttpClientModule, TooltipsModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AuthServiceService, GlobalsService, RegistrationService, HttpUtilsService, UtilsService,
    StatusBar,
    Platform,
    FCM, LocalNotifications,

    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
