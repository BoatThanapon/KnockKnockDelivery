import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api/auth';
  private iss = {
    login: 'http://localhost:8000/api/auth/login',
    signup: 'http://localhost:8000/api/auth/signup'
  };
  private UAT = localStorage.getItem('UAT')

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json,multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      'Authorization': 'Bearer '+ this.UAT,
      'Accept':'application/json, text/plain, */*',

    })
  };

  private userLoggedIn = new BehaviorSubject<boolean>(this.loggedIn());
  authStatus = this.userLoggedIn.asObservable()

  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data)
  }

  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data)
  }

  logOut() {
    return this.http.post(`${this.baseUrl}/logout`,this.httpOptions)

  }

  handleToken(token) {
    this.setToken(token);
  }

  setToken(token) {
    localStorage.setItem('UAT', token);
  }

  setUserId(data) {
    localStorage.setItem("user_id",data)
  }

  getToken() {
    return localStorage.getItem('UAT');
  }

  removeToken() {
    localStorage.removeItem('UAT');
    localStorage.removeItem('product_catagory');
    localStorage.removeItem('seller');
    localStorage.removeItem('shop_catagory');
    localStorage.removeItem('user_id');
    localStorage.removeItem('cart');



  }

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValidToken();
  }



  changeAuthStatus(value: boolean) {
    this.userLoggedIn.next(value);
  }

  setUserProfile(data) {
    console.log(data)
    localStorage.setItem('user_id', data.user.user_id);
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }
  
  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }
  
}
