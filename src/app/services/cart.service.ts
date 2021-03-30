import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  URL_API = 'http://35.167.62.109/storeutags/cart/update_item';
  URL_API_D = 'http://35.167.62.109/storeutags/cart/remove_item';

  constructor(private http: HttpClient) { }

  updateCart(id:any){
    return this.http.put(this.URL_API,id)
  }

  deleteCart(id:any){
    //return this.http.delete(this.URL_API_D +`/${id}`)
    return this.http.delete(this.URL_API_D,id)
  }
}
