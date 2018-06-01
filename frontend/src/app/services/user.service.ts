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





}
