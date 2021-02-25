import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  email:string;
  password:string;
  RequestBody:any;
  remember:boolean;
  regexpemail = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  regexppass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/);
  constructor(public LoginService: LoginService, public router: Router) { }

  ngOnInit(): void {
    
    if (localStorage.getItem('email') != null && localStorage.getItem('password')!= null){
      this.router.navigate(['/main/store'])
    }else{
      this.router.navigate(['/LogIn'])
    }
    this.validate_session();
    
  }

  validate_session(){
    // console.log("el local storage");
    // console.log(localStorage.getItem('full_name'));
    if (localStorage.getItem('session_id') == null || localStorage.getItem('full_name') == null){
      this.router.navigate(['/LogIn'])
     }else{
      // this.fullname = localStorage.getItem('full_name');
       this.router.navigate(['/main/store'])
    }
    
  }


  login(){
    // build request body
    this.RequestBody = {
      email: this.email,
      password: this.password
    }

    if (this.email == '' ||  this.regexpemail.test(this.email) == false){
      alert("Please enter a valid email format and the field cannot be empty ");
    }else if (this.password == '' || this.regexppass.test(this.password) == false){
      alert("Please enter a valid password format and the field cannot be empty ")
      
    }else{
      this.LoginService.loginservice(JSON.parse(JSON.stringify(this.RequestBody)))
    .subscribe(res => {
      // Get response from the API
      console.log("Response: ");
      console.log(res);
      let Response = JSON.stringify(res);
      let json = JSON.parse(Response)
      if (json.status == 'success'){
        if (this.remember == true){

          localStorage.setItem('full_name', json.data.customer.full_name);
          localStorage.setItem('session_id', json.data.session_id);
          localStorage.setItem('email', json.original_request.email);
          localStorage.setItem('password', json.original_request.password);
          this.router.navigate(['/main/store']);
        }else{
          localStorage.setItem('full_name', json.data.customer.full_name);
          localStorage.setItem('session_id', json.data.session_id);
          this.router.navigate(['/main/store']);
        }
      }else{
        if (json.error_code == 'EmailAndPasswordDoesNotMatch'){
          alert("Email or password was not found ")
          document.getElementById('mail').focus()
        }
      }
      
      
    });
    }
  }


  

}
