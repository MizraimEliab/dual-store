import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AccountRegistrationComponent } from './components/account-registration/account-registration.component';
// import { RouterModule, Routes } from '@angular/router';
//import { RecaptchaModule } from "ng-recaptcha"; //captcha module
import {
  RECAPTCHA_SETTINGS,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';

const globalSettings: RecaptchaSettings = { siteKey: '6Lfo6T0aAAAAAFSig1fD8Gbv5ljMqH7BKoaRDaGU' };

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule, // CLI adds AppRoutingModule to the AppModule's imports array
    RecaptchaModule
    
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: globalSettings,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
