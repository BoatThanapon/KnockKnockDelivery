import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})


export class UserService {

    private user_id;
    private baseUrl = 'http://localhost:8000/api/';


    constructor(private http: HttpClient) { }

    ngOnInit() {


    }

    getUserProfile(id) {
        return this.http.get(`${this.baseUrl}user/`+id+`/profiles`)

    }

    createSeller(seller) {
        var seller_form = {
            seller_name:seller.sellerName,
            shop_name: seller.shopName,
            shop_location: seller.location,
            shop_type_id: seller.selectedType,
            status_id: 1,
            profile_id: seller.profile_id
        }
        return this.http.post(`${this.baseUrl}seller`,seller_form)
    }

    fetchProfileDetail(profile) {
        console.log("Profile from user service: ",profile)
        var role = profile.role.role_name.toLowerCase();
        return this.http.get(`${this.baseUrl}`+role+`/profile/`+profile.profile_id);

    }




}
