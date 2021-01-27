import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signin } from '../models/signin';
@Injectable({
  providedIn: 'root'
})
export class SigninService {
  selectedUser: Signin;
  users: Signin[];
   URL_API = 'http://35.167.62.109/storeutags/security/create_account';
  
  constructor(private http: HttpClient) { 
    this.selectedUser = new Signin();
  }

  //method POST to new User
  postUser(User: string){
    return this.http.post(this.URL_API, User);
  }
}
