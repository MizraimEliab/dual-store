import { Component, OnInit } from '@angular/core';
import {ProductdetailsService} from '../../services/productdetails.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SearchService} from '../../services/search.service';
// get params by Route
import { ActivatedRoute, Params } from '@angular/router';
import {ToastService} from '../../services/toast.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  durationInSeconds = 5;
  SearchWordd = '';
  fullname:string;
  logOut:string;
  Quantity:number;
  NameProduct:string;
  ImageLargeProduct:string;
  DescriptionProduct:string;
  ProductPrice:string;
  Gallery: any[];
  ProductDetailsOriginal:string;
  RequestBody:any;
  session_id:string;
  CounterQuantity:number
  array: any[];
  elements:number;
  //item_id:number;
  constructor(public toastService: ToastService,public SearchService: SearchService,private _snackBar: MatSnackBar, public ProductDetailsService: ProductdetailsService,public router: Router, private ActiveRoute: ActivatedRoute) { }

  
  ngOnInit(): void {
    //console.log(this.ActiveRoute.snapshot.params.id);
    this.validate_session();
    this.getProductsDetails();
    this.getCartDeatils();
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

  test(){
    
    this.router.navigate(['/'], { queryParams: { product: this.SearchWordd } });
    
  }

  showSuccess() {
    this.toastService.show('Product added successfully', {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Message'
    });
  }

  showError() {
    this.toastService.show('The field must contain a number and cannot be empty', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Error message'
    });
  }




  validate_session(){
    // console.log("el local storage");
    // console.log(localStorage.getItem('full_name'));
    if (localStorage.getItem('session_id') == null || localStorage.getItem('full_name') == null){
      this.fullname = 'Log In';
      this.logOut = 'Sign In';
      console.log(this.fullname);
      
      
     }else{
       this.fullname = localStorage.getItem('full_name');
      console.log(this.fullname);
      
       this.logOut = 'LogOut';
       
    }
    
  }

  logout(){
    localStorage.removeItem('full_name');
    localStorage.removeItem('session_id');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    location.reload();
  }

  getProductsDetails(){
    this.ProductDetailsService.productdetails('http://35.167.62.109/storeutags/catalogs/item_details/' + this.ActiveRoute.snapshot.params.id )
    .subscribe(res =>{
      let Response = JSON.stringify(res);
      let json = JSON.parse(Response)
      //console.log(json.data.items[0]);
      this.NameProduct = json.data.items[0].short_description
      this.ImageLargeProduct = json.data.items[0].images_large
      this.DescriptionProduct = json.data.items[0].long_description
      this.ProductPrice = json.data.items[0].price
      this.ProductDetailsOriginal = json.data.items[0].html_details
      this.Gallery = json.data.items[0].images_gallery
      let html = document.getElementById('description');
      html.innerHTML = this.ProductDetailsOriginal
    });
  
  }

  addCart(){
    this.session_id = localStorage.getItem('session_id')

    this.RequestBody = {
      session_id: this.session_id,
      item_id: this.ActiveRoute.snapshot.params.id,
      item_quantity: this.Quantity
    }
    if(localStorage.getItem('session_id') == null){
      alert("Login to add products to cart");
      this.router.navigate(['/LogIn'])
      
    }else{
      this.ProductDetailsService.addCart(JSON.parse(JSON.stringify(this.RequestBody)))
      .subscribe(res=>{
        
        console.log(res);
        let Response = JSON.stringify(res);
        let json = JSON.parse(Response)
        
        if (json.error_code == 'ViolatedRules'){
          //alert("The field must contain a number and cannot be empty ");
          this.showError()
        }else{
          //alert("Product added successfully ");
          this.showSuccess()
          this.getCartDeatils();
        }
      });
    }
   
    
  }

  getCartDeatils(){
    this.session_id = localStorage.getItem('session_id')
    this.RequestBody = {
      session_id: this.session_id
    }
    if(localStorage.getItem('session_id') == null){
      
      this.CounterQuantity = 0
      
    }else{
      this.ProductDetailsService.getCartDetail(JSON.parse(JSON.stringify(this.RequestBody)))
      .subscribe(res=>{
      let Response = JSON.stringify(res);
      let json = JSON.parse(Response)
      console.log(json.data.items_quantity);
      this.CounterQuantity = json.data.items_quantity
        
      });
    }

  }

  
}
