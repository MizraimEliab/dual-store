import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SearchService} from '../../services/search.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fullname:string;
  categories = [];
  items = [];
  elements:number;
  SearchWordd = '';
  find = '';
  array: any[];
  constructor(public SearchService: SearchService,public router: Router) { }

  ngOnInit(): void {
    //this.validate_session();
    this.getCategories()
    this.getProducts()
  }

  validate_session(){
    // console.log("el local storage");
    // console.log(localStorage.getItem('full_name'));
    if (localStorage.getItem('session_id') == null || localStorage.getItem('full_name') == null){
      this.router.navigate(['/LogIn'])
     }else{
       this.fullname = localStorage.getItem('full_name');
       this.router.navigate(['/main/store'])
    }
    
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
      

     
      
      
      
      
      //console.log(json.data.items);
      //this.items.push(json.data.items)
     // console.log(this.items[0]);
      //this.elements = this.items[0].length
      
       
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


  

}
