import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private baseUrl = 'http://localhost:8000/api/';
  private UAT = localStorage.getItem('UAT')
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.UAT
    })
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {


  }

  updateShop(form, seller) {
    return this.http.put(`${this.baseUrl}seller/` + seller.seller_id, form, this.httpOptions)
  }

  getAllProducts(seller) {
    var temp = this.http.get<Product>(`${this.baseUrl}seller/` + seller.seller_id + `/products`,this.httpOptions)
    console.log("getAllProducts from service: ", temp)
    return temp
  }

  getAllShops(){
    return this.http.get<shops>(`${this.baseUrl}sellers/`,this.httpOptions)
  }

  getShopCategories() {
    return this.http.get<shopCategorie>(`${this.baseUrl}shoptypes`,this.httpOptions)
  }

  getProductCategories() {
    return this.http.get<productCategorie>(`${this.baseUrl}categories`,this.httpOptions)
  }

  createProduct(product, seller) {
    return this.http.post(`${this.baseUrl}seller/` + seller.seller_id + `/product`, product,this.httpOptions)

  }

  deleteProduct(id){
    return this.http.delete(`${this.baseUrl}seller/product/` + id,this.httpOptions)
  }

  updateProduct(id, product, seller) {
    return this.http.put(`${this.baseUrl}seller/` + seller.seller_id + `/product/` + id, product,this.httpOptions)

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

export interface productCategorie {
  message: null,
  data: [
    { category_id: null, category_name: "" }]

}

export interface shopCategorie {
  message: null,
  data: [
    { category_id: null, category_name: "" }]

}

export interface shops {
  data: [{
    seller_id: null,
    seller_name: null,
    shop_name: null,
    shop_location: null,
    shop_type: {
        shop_type_id: null,
        shop_type_name: null
    },
    profile_status: {
        profile_status_id: null,
        profile_status_name: null
    },
    profile_id: 1
}]

}


