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
  show:Boolean
  change: Boolean
  email:String
  code_verification:String
  password:String
  password_confirmation:String
  RequestBody:any
  
  constructor(public RecoveryService: RecoveryPasswordService, public router: Router) { }

  ngOnInit(): void {
    this.show = false
    this.change = false
  }

  SendCode(){
    this.RequestBody = {
      email: this.email
    }

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
    });

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
      }else{
        this.change = false
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
