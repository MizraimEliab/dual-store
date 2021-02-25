import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL_API = 'http://35.167.62.109/storeutags/security/login ';

  constructor(private http: HttpClient) { }


  loginservice(User:any){
    return this.http.post(this.URL_API, User)
  }

}
