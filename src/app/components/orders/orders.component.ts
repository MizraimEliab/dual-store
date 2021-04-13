import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SearchService} from '../../services/search.service';
import {ProductdetailsService} from '../../services/productdetails.service';
import {CartService} from '../../services/cart.service';
import {SearchOtherService} from '../../services/search-other.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  fullname:string;
  logOut:string;
  categories = [];
  items = [];
  orders: any[];
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
  ordersFound:number;
  constructor(public searchO: SearchOtherService,public carts: CartService ,public ProductDetailsService: ProductdetailsService,public SearchService: SearchService,public router: Router) { }

  ngOnInit(): void {
    this.validate_session();
    this.getOrders();
    this.getCartDeatilsNumber();
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
  
  getProductsO(){
    this.searchO.wordfind = this.SearchWordd
    this.router.navigate(['/'], { queryParams: { product: this.searchO.wordfind } });
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


  getCartDeatilsNumber(){
    this.session_id = localStorage.getItem('session_id')
    this.RequestBody = {
      session_id: this.session_id
    }
  
      this.ProductDetailsService.getCartDetail(JSON.parse(JSON.stringify(this.RequestBody)))
      .subscribe(res=>{
      let Response = JSON.stringify(res);
      let json = JSON.parse(Response)
      this.CounterQuantity = json.data.items_quantity
      
      });
    

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

  callbackFunction(xmlhttp){
    console.log(xmlhttp);
    return xmlhttp;

  }

  getOrders(){
    this.session_id = localStorage.getItem('session_id')
    this.RequestBody = {
      session_id: this.session_id
    }
    this.carts.getOrders(this.RequestBody)
    .subscribe(res =>{
      console.log(res);
      let Response = JSON.stringify(res);
      let json = JSON.parse(Response)
      console.log("******************");
      console.log(json);
      this.ordersFound = json.data.orders.length
      
       this.orders = json.data.orders
    })
  }

}
