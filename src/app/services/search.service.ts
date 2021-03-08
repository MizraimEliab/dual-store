import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  URL_API = 'http://35.167.62.109/storeutags/catalogs/categories';

  constructor(private http: HttpClient) { }


  getCategories() {
    return this.http.get(this.URL_API);
  }

  getByText(product:string){
    return this.http.get(product);
  }

  getByCategory(category:string){
    return this.http.get(category);
  }
}
