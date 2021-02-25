import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  fullname:string;
  constructor(public router:Router) { }

  ngOnInit(): void {
    this.validate_session();
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

  logout(){
    localStorage.removeItem('full_name');
    localStorage.removeItem('session_id');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.router.navigate(['/']);
  }
}
