import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  private baseUrl = 'http://localhost:8000/api/';


  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product>(`${this.baseUrl}products`)

  }
}

export interface Product {
  data: [{
    product_id: null,
    product_name: null,
    product_description: null,
    product_price: null,
    unit_in_stock: null,
    product_available: null,
    category: {
      category_id: null,
      category_name: null
    }
  }]
}


