import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AccountRegistrationComponent } from './components/account-registration/account-registration.component';
// import { RouterModule, Routes } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule // CLI adds AppRoutingModule to the AppModule's imports array
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
