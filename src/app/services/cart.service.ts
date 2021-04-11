import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  URL_API = 'http://35.167.62.109/storeutags/cart/update_item';
  URL_API_D = 'http://35.167.62.109/storeutags/cart/remove_item';
  URL_API_DA = 'http://35.167.62.109/storeutags/cart/remove_all';
  URL_API_ORDER = 'http://35.167.62.109/storeutags/order/create';

  constructor(private http: HttpClient) { }

  updateCart(id:any){
    return this.http.put(this.URL_API,id)
  }

  deleteCart(id:any){
    //return this.http.delete(this.URL_API_D +`/${id}`)
    return this.http.delete(this.URL_API_D,id)
  }

  deleteAllCart(session:any){
    return this.http.delete(this.URL_API_DA, session)
  }

  createOrder(body:any){
    return this.http.post(this.URL_API_ORDER,body)
  }
}
