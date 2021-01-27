import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { AccountRegistrationComponent } from '../app/components/account-registration/account-registration.component';
import { HomeComponent } from '../app/components/home/home.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Signin', component: AccountRegistrationComponent }
];

@NgModule({
  // declarations: [
  //   AppComponent,
  //   AccountRegistrationComponent
  // ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
