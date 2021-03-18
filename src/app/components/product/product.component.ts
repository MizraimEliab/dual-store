import { Component, OnInit } from '@angular/core';
import {ProductdetailsService} from '../../services/productdetails.service';
import { Router } from '@angular/router';
// get params by Route
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  SearchWordd = '';
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
  //item_id:number;
  constructor(public ProductDetailsService: ProductdetailsService,public router: Router, private ActiveRoute: ActivatedRoute) { }

  
  ngOnInit(): void {
    //console.log(this.ActiveRoute.snapshot.params.id);
    this.getProductsDetails();
    this.getCartDeatils();
  }
  getProducts(){}

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
      
      
    }else{
      this.ProductDetailsService.addCart(JSON.parse(JSON.stringify(this.RequestBody)))
      .subscribe(res=>{
        
        console.log(res);
        let Response = JSON.stringify(res);
        let json = JSON.parse(Response)
        
        if (json.error_code == 'ViolatedRules'){
          alert("The field must contain a number and cannot be empty ");
          
        }else{
          alert("Product added successfully ");
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
