import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { SigninService } from '../../services/signin.service';


@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css'],
  providers: [SigninService]
})

export class AccountRegistrationComponent implements OnInit {
  first_name:string;
  middle_name:string;
  last_name:string;
  phone_number:string;
  city:string;
  state:string;
  email:string;
  password:string;
  password_confirmation:string;
  body:any
  output:any
  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
  

  repetPassword:String
  regexp = new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}');
  regexppass = new RegExp('^(?=(?:.*\d){8})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{8,}$');
  constructor(public userService: SigninService, public router: Router) { }

  ngOnInit(): void {
    this.addRecaptchaScript();
  }

  create_user(){
    // Create de JSON Body with the data
    this.body = {
      first_name: this.first_name,
      middle_name: this.middle_name,
      last_name:this.last_name,
      phone_number: this.phone_number,
      address: {
        city: this.city,
        state: this.state
      },
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    }
 
      if (this.regexp.test(this.email) == false){
      alert("El correo de cumple con las condiciones de un formato correcto");
      }else if (this.password != this.password_confirmation){
        alert("Las contraseñas no son iguales");
      }else if(this.regexppass.test(this.password) == false || this.regexppass.test(this.password_confirmation)){
        alert("El formato de la constraseña no es correcto");
      }else{
        //Evething all rigth
        // Go with request to API
        this.userService.postUser(JSON.parse(JSON.stringify(this.body)))
        .subscribe(res => {
          // Get response from the API
          console.log("Response: ");
          console.log(res);
          
        }, err =>{
          // Get error response from the API
          console.log("Error Response: ");
          console.log(err);
        });      
      }
    
    

  }

  // addUser(form: NgForm){
  //   if (this.repetPassword != this.userService.selectedUser.password) {
  //     alert('Error las contraseñas no son iguales, no creamos tu usuario 😕')
  //     this.router.navigate(['/Signin'])
  //   }else if (this.regexp.test(this.userService.selectedUser.email)){
  //     this.userService.postUser(form.value)
  //     .subscribe(res => {
  //       console.log(res);
  //       alert(res)
  //       let data = JSON.stringify(res);
  //       let dataJson = JSON.parse(data);
  //       localStorage.setItem('token', dataJson.token);
  //     });
  //   }else{
  //     alert('Error el correo no cumple con las condiciones, no creamos tu usuario 😕')
  //     this.router.navigate(['/Signin'])
  //   }
   
  // }


  renderReCaptch() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey' : '6Lfo6T0aAAAAAOrnUhfMqvhg67s0SB-2GELdcctK',
      'callback': (response) => {
          console.log(response);
      }
    });
    
  }

  
  addRecaptchaScript() {
 
    window['grecaptchaCallback'] = () => {
      this.renderReCaptch();
    }
 
    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptch(); return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
 
  }
 

}
