import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fullname:string;
  constructor(public router: Router) { }

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

  

}
