import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationComponent} from '../components/confirmation/confirmation.component'
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  URL_API = 'http://35.167.62.109/storeutags/cart/update_item';
  URL_API_D = 'http://35.167.62.109/storeutags/cart/remove_item';
  URL_API_DA = 'http://35.167.62.109/storeutags/cart/remove_all';
  URL_API_ORDER = 'http://35.167.62.109/storeutags/order/create';
  URL_API_ORDERS = 'http://35.167.62.109/storeutags/order/get_orders';

  constructor(private http: HttpClient, private modalService: NgbModal) { }

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

  getOrders(body:any){
    return this.http.post(this.URL_API_ORDERS, body)
  }

 


  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
