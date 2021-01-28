import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

   
  URL_API = 'http://35.167.62.109/storeutags/security/create_account';
  
  constructor(private http: HttpClient) { }

  //method POST to new User
  postUser(User: any){
    return this.http.post(this.URL_API, User);
  }
}
