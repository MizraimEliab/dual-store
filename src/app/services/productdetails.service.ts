import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductdetailsService {

  URL_API = 'http://35.167.62.109/storeutags/cart/add_item'
  URL_API_GET_CART_DETAILS = 'http://35.167.62.109/storeutags/cart/get_details';
  constructor(private http: HttpClient) { }


  
  productdetails(product:string){
    return this.http.get(product)
  }

  addCart(item:any){
    return this.http.post(this.URL_API,item)
  }

  getCartDetail(session:any){
    return this.http.post(this.URL_API_GET_CART_DETAILS, session)
  }
}
