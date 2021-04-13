import { Component, OnInit } from '@angular/core';
import { Router,  NavigationEnd } from '@angular/router';
import {LoginService} from '../../services/login.service';
import {ToastService} from '../../services/toast.service';
import {PagerService} from '../../services/pager.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  email:string;
  password:string;
  RequestBody:any;
  previousUrl: string = null;
  currentUrl: string = null;
  remember:boolean;
  regexpemail = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  regexppass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/);
  constructor(public page : PagerService,public toastService: ToastService,public LoginService: LoginService, public router: Router) { }

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

  showSuccess() {
    this.toastService.show('Welcome ' + localStorage.getItem('full_name'), {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Message'
    });
  }

  showErrorEmailFormat() {
    this.toastService.show('Please enter a valid email format and the field cannot be empty', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Error message'
    });
  }

  showErrorPass() {
    this.toastService.show('Please enter a valid password format and the field cannot be empty', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Error message'
    });
  }

  showErrorNotFound() {
    this.toastService.show('EmailAndPasswordDoesNotMatch', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Error message'
    });
  }


  login(){
    // build request body
    this.RequestBody = {
      email: this.email,
      password: this.password
    }

    if (this.email == '' ||  this.regexpemail.test(this.email) == false){
      //alert("Please enter a valid email format and the field cannot be empty ");
      this.showErrorEmailFormat()
    }else if (this.password == '' || this.regexppass.test(this.password) == false){
      //alert("Please enter a valid password format and the field cannot be empty ")
      this.showErrorPass()
      
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
          //this.showSuccess()
          //this.router.navigate(['/']);
          if(this.page.currentPosition  === '/Signin'){
            this.router.navigate(['/'])
          }else{
            window.history.back();
          }
          
        }else{
          localStorage.setItem('full_name', json.data.customer.full_name);
          localStorage.setItem('session_id', json.data.session_id);
          //this.showSuccess()
          //this.router.navigate(['/']);
          //window.history.back();
          if(this.page.currentPosition  === '/Signin'){
            this.router.navigate(['/'])
          }else{
            window.history.back();
          }
        }
      }else{
        if (json.error_code == 'EmailAndPasswordDoesNotMatch'){
          //alert("Email or password was not found ")
          this.showErrorNotFound()
          document.getElementById('mail').focus()
        }
      }
      
      
    });
    }
  }


  

}
