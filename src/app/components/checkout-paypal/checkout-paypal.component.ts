import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SearchService} from '../../services/search.service';
import {ProductdetailsService} from '../../services/productdetails.service';
import {CartService} from '../../services/cart.service';
import {IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
// import { NgxPayPalModule } from 'ngx-paypal';
declare let paypal: any;
@Component({
  selector: 'app-checkout-paypal',
  templateUrl: './checkout-paypal.component.html',
  styleUrls: ['./checkout-paypal.component.css']
})

export class CheckoutPaypalComponent implements OnInit {
  fullname:string;
  logOut:string;
  categories = [];
  items = [];
  elements:number;
  SearchWordd = '';
  find = '';
  CounterQuantity:number;
  quantity_in:number;
  session_id:string;
  RequestBody:any;
  RequestUpdate:any;
  array: any[];
  cart: any[];
  session:string;
  subtotal:number;
  iva:number;
  total:number;
  showPayment:boolean;
  showThanks:boolean;
  createOrder:string;
  numberOrder:string;
  public payPalConfig ? : IPayPalConfig;
  
  constructor(public carts: CartService ,public ProductDetailsService: ProductdetailsService,public SearchService: SearchService,public router: Router) { }

  ngOnInit(): void {
    this.showPayment = true;
    this.showThanks = false;
    this.getCartDeatils()
    this.initConfig();
  }

  validate_session(){
    // console.log("el local storage");
    // console.log(localStorage.getItem('full_name'));
    if (localStorage.getItem('session_id') == null || localStorage.getItem('full_name') == null){
      this.fullname = 'Log In';
      this.logOut = 'Sign In';
      console.log(this.fullname);
      
      this.router.navigate(['/LogIn'])
     }else{
        this.fullname = localStorage.getItem('full_name');
        console.log(this.fullname);
      
       this.logOut = 'LogOut';
       //this.router.navigate(['/'])
    }
    
  }

  logout(){
    localStorage.removeItem('full_name');
    localStorage.removeItem('session_id');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    location.reload();
  }

  getProducts(){
    this.array = [];
    //this.items = [];
    this.SearchService.getByText('http://35.167.62.109/storeutags/catalogs/items/by_text/' + this.SearchWordd)
    .subscribe(res =>{
      let Response = JSON.stringify(res);
      let json = JSON.parse(Response)
 
      if (json.hasOwnProperty("data") == true){
        //console.log("los items son:");
        this.array = json.data.items
        //console.log(this.array);

      
        this.elements = this.array.length
      }else{
        this.elements = 0
      }
       
    });
    
  }



  getCategories(){
    this.SearchService.getCategories()
    .subscribe(res =>{
      let Response = JSON.stringify(res);
      let json = JSON.parse(Response)
   
      this.categories.push(json.data.categories)
    });
  }

  change(event){
    if (event.target.checked == true){
      this.find = this.find + event.target.defaultValue + ';';
      //console.log(this.find);
    
    }else{
      // no esta en true la casilla
      this.find = this.find.replace(event.target.defaultValue + ';', '')
      
    }
    

    

    //this.items = [];
    this.array = [];
    this.SearchService.getByCategory('http://35.167.62.109/storeutags/catalogs/items/by_category/' + this.find)
    .subscribe(res =>{
      let Response = JSON.stringify(res);
      let json = JSON.parse(Response)
      //this.items.push(json.data.items)
      this.array = json.data.items
      this.elements = this.array.length
      //this.elements = this.items[0].length
    });
  }

  getCartDeatils(){
    
    this.session_id = localStorage.getItem('session_id')
    this.RequestBody = {
      session_id: this.session_id
    }
    if(localStorage.getItem('session_id') == null){
      
      this.CounterQuantity = 0
      // redirect to home
      
      this.router.navigate(['/LogIn'])
      
    }else{
      this.ProductDetailsService.getCartDetail(JSON.parse(JSON.stringify(this.RequestBody)))
      .subscribe(res=>{
      let Response = JSON.stringify(res);
      let json = JSON.parse(Response)
      console.log(json.data.items_quantity);
      console.log( json.data);
      this.cart = json.data.items
      this.subtotal = json.data.sub_total
      this.iva = json.data.taxes
      this.total = json.data.total
      this.CounterQuantity = json.data.items_quantity
      if (this.CounterQuantity == 0){
        this.router.navigate(['/'])
      }
      });
    }

  }
  //update the cart
  changequantity(event, item_id){
    //console.log('***********************************');
    
    //console.log(item_id);
    
    this.session = localStorage.getItem('session_id')
    this.RequestUpdate = {
      session_id: this.session,
      item_id: item_id,
      item_quantity: event.target.value
    }
    //console.log(event.target.value);
    this.carts.updateCart(this.RequestUpdate)
    .subscribe(res=>{
      //console.log('+++++++++++');
      console.log(res);
      this.getCartDeatils()
      
    })
    
  }

  deleteItem(id){
    this.session = localStorage.getItem('session_id')
    console.log(this.session);
    
    this.RequestUpdate = {
      session_id: this.session,
      item_id: id
    }

    let xml = this.deleteOne(this.RequestUpdate);
    console.log(xml)

    console.log('DELETE ****************');
    console.log(this.RequestUpdate);
    this.getCartDeatils()
  
  }

  deleteOne(obj){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
    xmlhttp.open('DELETE','http://35.167.62.109/storeutags/cart/remove_item',false);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
    xmlhttp.send(JSON.stringify(obj)); 
    return xmlhttp; 
  }

  deleteAll(){
    this.session_id = localStorage.getItem('session_id')
    this.RequestBody = {
      session_id: this.session_id
    }
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
    xmlhttp.open('DELETE','http://35.167.62.109/storeutags/cart/remove_item',false);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.onreadystatechange = this.callbackFunction(xmlhttp);
    xmlhttp.send(JSON.stringify(this.RequestBody)); 
    return xmlhttp; 
  }

  callbackFunction(xmlhttp){
    console.log(xmlhttp);
    return xmlhttp;

  }
  
  // Start paypal integration
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'MXN',
        clientId: 'AV9PeNycOPyE1ti_TL9CmHGSwxZeuafBAfMUtnsmqPM6miE56brwyjdTeV6gfsyZQHuezDkoGZt1rADY',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'MXN',
                    value: this.total.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'MXN',
                            value: this.total.toString()
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'MXN',
                        value: this.total.toString(),
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            // console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
                // send order to API 
                let Response = JSON.stringify(details);
                let json = JSON.parse(Response)

                this.createOrder = json.create_time
                this.numberOrder = json.id
                this.session_id = localStorage.getItem('session_id')
                this.RequestBody = {
                  session_id: this.session_id,
                  paypal_payment_details: details
                }
                this.carts.createOrder(this.RequestBody)
                .subscribe(res =>{
                  console.log('**************************************');
                  this.showPayment = false;
                  this.showThanks = true;
                  console.log(res);
                  
                })

            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            

        },
        onError: err => {
            console.log('OnError', err);
            
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            
        }
    };
}

// end paypal integration


  

}
