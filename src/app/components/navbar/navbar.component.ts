import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SearchService} from '../../services/search.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories = [];
  items = [];
  elements:number;
  SearchWordd = '';
  find = '';
  array: any[];
  constructor(public SearchService: SearchService,public router: Router) { }

  ngOnInit(): void {
    this.getProducts()
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

}
