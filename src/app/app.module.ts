import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AccountRegistrationComponent } from '../app/components/account-registration/account-registration.component';
//import { RouterModule, Routes } from '@angular/router';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LogInComponent } from './components/log-in/log-in.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { MainComponent } from './components/main/main.component';
import { StoreComponent } from './components/store/store.component';
import {HomeComponent} from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { CheckoutPaypalComponent } from './components/checkout-paypal/checkout-paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { OrdersComponent } from './components/orders/orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const globalSettings: RecaptchaSettings = { siteKey: '6Lfo6T0aAAAAAFSig1fD8Gbv5ljMqH7BKoaRDaGU' };

@NgModule({
  declarations: [
    AppComponent,
    AccountRegistrationComponent,
    LogInComponent,
    RecoveryPasswordComponent,
    MainComponent,
    StoreComponent,
    HomeComponent,
    ProductComponent,
    NavbarComponent,
    CartViewComponent,
    CheckoutPaypalComponent,
    OrdersComponent,
    ConfirmationComponent
    
  ],
  exports: [AppComponent,MatSnackBarModule],
  imports: [
    BrowserModule,
    AppRoutingModule, // CLI adds AppRoutingModule to the AppModule's imports array
    RecaptchaModule,
    HttpClientModule,
    FormsModule,
    NgxPayPalModule,
    NgbModule,
    NoopAnimationsModule
    
  ],
 
 
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: globalSettings,
  }],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
