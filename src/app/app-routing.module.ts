import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { AccountRegistrationComponent } from '../app/components/account-registration/account-registration.component';
import { HomeComponent } from '../app/components/home/home.component';
import {LogInComponent} from '../app/components/log-in/log-in.component';
import {MainComponent} from '../app/components/main/main.component';
import {StoreComponent} from '../app/components/store/store.component';
import {RecoveryPasswordComponent} from '../app/components/recovery-password/recovery-password.component';
import {ProductComponent} from '../app/components/product/product.component';
import {CartViewComponent} from '../app/components/cart-view/cart-view.component';
import {CheckoutPaypalComponent} from '../app/components/checkout-paypal/checkout-paypal.component';
import {OrdersComponent} from '../app/components/orders/orders.component';
const routes: Routes = [
  { path: '', component: HomeComponent,  },
  { path: 'Signin', component: AccountRegistrationComponent },
  {path: 'LogIn', component: LogInComponent},
  {path: 'RecoveryPassword', component: RecoveryPasswordComponent},
  {path: 'product/:id', component: ProductComponent },
  {path: 'cart', component: CartViewComponent},
  {path: 'checkout', component: CheckoutPaypalComponent},
  {path: 'myorders', component: OrdersComponent}
  // {path: 'main', component: MainComponent,
  // children: [
  //   { path: 'store', component: StoreComponent}
  // ]}
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
