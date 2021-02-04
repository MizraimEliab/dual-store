import { Component, OnInit } from '@angular/core';
import {RecoveryPasswordService} from '../../services/recovery-password.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css'],
  providers: [RecoveryPasswordService]
})
export class RecoveryPasswordComponent implements OnInit {
  show:Boolean;
  change: Boolean;
  start:Boolean;
  email:string;
  code_verification:String;
  password:string;
  password_confirmation:string;
  RequestBody:any;
  regexpemail = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  regexppass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/);
  constructor(public RecoveryService: RecoveryPasswordService, public router: Router) { }

  ngOnInit(): void {
    this.show = false
    this.change = false
    this.start = false
  }

  SendCode(){
    this.RequestBody = {
      email: this.email
    }
    if (this.email == '' ||  this.regexpemail.test(this.email) == false){
      alert("Please enter a valid email format and the field cannot be empty ");
    }else{
      this.RecoveryService.postRecoveryCode(JSON.parse(JSON.stringify(this.RequestBody)))
    .subscribe(res => {
      // Get response from the API
      console.log("Response: ");
      console.log(res);
      let Response = JSON.stringify(res);
      let json = JSON.parse(Response)
      if (json.status == 'success'){
        this.show = true
      }else{
        this.show = false
      }
      if(json.error_code == 'AccountDoesNotExist'){
        alert("This account does not exist. Enter a valid email ");
      }
      
    });
    }
    

  }

  ValidateCode(){
    this.RequestBody = {
      email: this.email,
      recovery_code: this.code_verification
    }
    this.RecoveryService.postValidateCode(JSON.parse(JSON.stringify(this.RequestBody)))
    .subscribe(res => {
      // Get response from the API
      console.log("Response: ");
      console.log(res);
      let Response = JSON.stringify(res);
      let json = JSON.parse(Response)
      if (json.status == 'success'){
        this.change = true
        this.show = false
        this.start = true
      }else{
        this.change = false
      }
      if (json.error_code == 'MailOrRecoveryCodeMatch' || json.error_code == 'ViolatedRules'){
        alert("Security code does not match ");
      }
    });
  }

  ChangePassword(){
    this.RequestBody = {
      email: this.email,
      recovery_code: this.code_verification,
      password: this.password,
      password_confirmation: this.password_confirmation
    }
    if (this.regexppass.test(this.password) == false || this.regexppass.test(this.password_confirmation) == false){
      alert("The format of the passwords is not the same or the passwords do not match and also cannot be empty ");
    }else{
      this.RecoveryService.postChangePassword(JSON.parse(JSON.stringify(this.RequestBody)))
    .subscribe(res => {
      // Get response from the API
      console.log("Response: ");
      console.log(res);
      let Response = JSON.stringify(res);
      let json = JSON.parse(Response)
      if (json.status == 'success'){
        this.router.navigate(['/LogIn']);
      }
 
      
    });
    }
    
  }

}
