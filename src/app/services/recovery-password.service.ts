import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {

  URL_API_Recovery = 'http://35.167.62.109/storeutags/security/request_recovery_code';
  URL_API_Validate = 'http://35.167.62.109/storeutags/security/validate_recovery_code';
  URL_API_Change = 'http://35.167.62.109/storeutags/security/update_password';

  constructor(private http: HttpClient) { }

  // HTTP Methods to restore the password
  postRecoveryCode(email:any){
    return this.http.post(this.URL_API_Recovery, email);
  }

  postValidateCode(code:any){
    return this.http.post(this.URL_API_Validate, code)
  }

  postChangePassword(change:any){
    return this.http.post(this.URL_API_Change, change)
  }

}
