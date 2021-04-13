import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {SearchService} from '../../services/search.service';
import {ProductdetailsService} from '../../services/productdetails.service';
import {SearchOtherService} from '../../services/search-other.service';
import {ToastService} from '../../services/toast.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fullname:string;
  logOut:string;
  categories = [];
  items = [];
  elements:number;
  SearchWordd = '';
  find = '';
  CounterQuantity:number;
  session_id:string;
  RequestBody:any;
  array: any[];
  result:string;
  constructor(public toastService: ToastService,public searchO: SearchOtherService,private route: ActivatedRoute,public ProductDetailsService: ProductdetailsService, public SearchService: SearchService,public router: Router) { }

  ngOnInit(): void {
    console.log('*************');
    console.log(this.searchO.wordfind);
    console.log('***************');
    this.validate_session();
    this.getCategories()
    if (this.searchO.wordfind == ''){
      console.log(' no tiene nada');
      
      this.getProducts(this.SearchWordd)
    }else{
      console.log('tiene algo');
      
      this.getProducts(this.searchO.wordfind)
    }

    this.getCartDeatils()
    
  }

  showSuccess() {
    this.toastService.show('Welcome ' + localStorage.getItem('full_name'), {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Message'
    });
  }

  validate_session(){
    // console.log("el local storage");
    // console.log(localStorage.getItem('full_name'));
    if (localStorage.getItem('session_id') == null || localStorage.getItem('full_name') == null){
      this.fullname = 'Log In';
      this.logOut = 'Sign In';
      console.log(this.fullname);
      
      this.router.navigate(['/'])
     }else{
       this.fullname = localStorage.getItem('full_name');
      console.log(this.fullname);
      
       this.logOut = 'LogOut';
       this.router.navigate(['/'])
      // this.showSuccess()
    }
    
  }

  logout(){
    localStorage.removeItem('full_name');
    localStorage.removeItem('session_id');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    location.reload();
  }

  getProducts(product:string){
    console.log(this.route.snapshot.queryParams.product);
    this.array = [];
    //this.items = [];
    this.SearchService.getByText('http://35.167.62.109/storeutags/catalogs/items/by_text/' + product)
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

  searchbyTextOne(){
    if (this.route.snapshot.queryParams.product != ''){
      this.SearchWordd =  this.route.snapshot.queryParams.product
    }
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
    // console.log(event.target.checked);
    // console.log(event.target.defaultValue);
    // console.log(event);
    if (event.target.checked == true){
      this.find = this.find + event.target.defaultValue + ';';
      //console.log(this.find);
    
    }else{
      // no esta en true la casilla
      this.find = this.find.replace(event.target.defaultValue + ';', '')

      //this.find = this.find.replace(';','')
      // console.log('nuevo');
      
      // console.log(this.find);
      
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
