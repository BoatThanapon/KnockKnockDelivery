import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})


export class UserService {

    private user_id;
    private baseUrl = 'http://localhost:8000/api/';
    private UAT = this.setUAT();

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json,multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          'Authorization': 'Bearer '+ this.setUAT(),
          'Accept':'application/json, text/plain, */*',

        })
      };

    constructor(private http: HttpClient) { }

    ngOnInit() {
        
    }

    setUAT() {
        return localStorage.getItem('UAT')
    }



    getUserProfile(id) {
        return this.http.get<user>(`${this.baseUrl}user/` + id + `/profiles`,this.httpOptions)
    }

    getMasterData() {
        return this.http.get<masterData>(`${this.baseUrl}masterData`,this.httpOptions)
    }

    createSeller(seller) {
        var seller_form = {
            seller_name: seller.sellerName,
            shop_name: seller.shopName,
            shop_location: seller.location,
            shop_type_id: seller.selectedType,
            status_id: 1,
            user_id: seller.profile_id
        }
        return this.http.post(`${this.baseUrl}seller`, seller_form,this.httpOptions)
    }

    async fetchProfileDetail(profile) {
        var role = profile.role.role_name.toLowerCase();
        const response = await this.http.get<Profile>(`${this.baseUrl}` + role + `/profile/` + profile.profile_id,this.httpOptions).toPromise();
        console.log("fetchProfileDetail response: ", response)
        return response.data[0];

    }


}

export interface Profile {
    data: [{
        seller_id: "",
        seller_name: "",
        shop_name: "",
        shop_location: "",
        shop_type: {
            shop_type_id: "",
            shop_type_name: ""
        },
        profile_status: {
            profile_status_id: "",
            profile_status_name: ""
        },
        profile_id: ""
    }]
}

export interface user {
    data: {
        seller:null,
        buyer:null,
        shipper:null,
        role:{
            role_id:null
        }
    },
    message:null,
    
}

export interface masterData {
    data: {
        profile_status:null,
        shop_type:null,
        bank_account:null,
        product_category:null,
        product_status:null,
        order_status:null

    },
    message:null
}


