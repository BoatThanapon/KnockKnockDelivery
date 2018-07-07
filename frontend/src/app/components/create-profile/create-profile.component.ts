import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SellerService } from '../../services/seller.service';

import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  private create_profile_id;
  private user_id;
  private isCreateBuyer: Boolean = false;
  private isCreateSeller: Boolean = false;
  private isCreateDeliver: Boolean = false;
  private isShow: boolean = true;
  latitude: number = 18.847882;
  longtitude: number = 99.006974;
  accuracy?: number;
  


  sellerForm = {
    shop_name: null,
    shop_location: null,
    shop_type_id:null,
    user_id:null,
    shop_logo_image: null,
    shop_latitude:null,
    shop_longitude:null
  }

  form = { 
    shop_name: '_',
    shop_location: 'Chiang Mai',
    shop_latitude: '134.343',
    shop_longitude: '34.4234234',
    shop_type_id: '1',
    user_id: '3',
    shop_logo_image: undefined 
  }

  private shopCatagory;

  buyerForm = {
    buyerName: null,
    location: null,
  }

  deliverForm = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  }


  error = []



  constructor(    
    private userService: UserService,
    private sellerService: SellerService,
    
    

  ) {
    // if (navigator)
    // {
    // navigator.geolocation.getCurrentPosition( pos => {
    //     this.longtitude = +pos.coords.longitude;
    //     this.latitude = +pos.coords.latitude;
    //     this.sellerForm.shop_latitude = +pos.coords.latitude;
    //     this.sellerForm.shop_longitude = +pos.coords.longitude;
    //   });
    // }
    this.getGeoLocation();
   }

  ngOnInit() {
    this.fetchMasterType();
  }

  getGeoLocation(){
    if (navigator.geolocation) {
        var options = {
          enableHighAccuracy: true
        };

        navigator.geolocation.getCurrentPosition(position=> {
          this.latitude = position.coords.latitude;
          this.longtitude = position.coords.longitude;
          this.sellerForm.shop_latitude = position.coords.latitude;
          this.sellerForm.shop_longitude = position.coords.longitude;
          let geocoder = new google.maps.Geocoder();
          let latlng = new google.maps.LatLng(this.latitude, this.longtitude);
          let request = {
            location: latlng
          };   

          geocoder.geocode(request,  (results, status) => {     

            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0] != null) {
               let city = results[0].address_components[results[0].address_components.length-4].short_name;                      

               this.sellerForm.shop_location = city;


              } else {
                alert("No address available");
              }
            }
});

        }, error => {
          console.log(error);
        }, options);
    }
  }

  onChooseLocation(event) {
    this.latitude = event.coords.lat;
    this.longtitude = event.coords.lng;
    this.sellerForm.shop_latitude = event.coords.lat;
    this.sellerForm.shop_longitude = event.coords.lng;
  }

  validateCreateProfile() {
    this.create_profile_id = localStorage.getItem("create-profile-id");
    if (this.create_profile_id == 2) {
      this.isShow = !this.isShow;   
      // this.sellerService.getShopCategories().subscribe(
      //   Response => {
      //     this.isShow = !this.isShow;   
      //     console.log("Response from get catagory: ",Response.data);
      //     this.shopCatagory = Response.data;
      //   },
      //   error => {
      //     console.log("[Error] from get catagory: ",error);
      //   }
      // )
      this.isCreateSeller = !this.isCreateSeller;
    }
    else if (this.create_profile_id == 3) {
      this.isCreateBuyer = !this.isCreateBuyer;
      this.isShow = !this.isShow;   

    }
    else if (this.create_profile_id == 4) {
      this.isCreateDeliver = !this.isCreateDeliver;
      this.isShow = !this.isShow;   

    }


  }

  fetchMasterType(){
    this.userService.getMasterData().subscribe(
      Response => {
        console.log("[Response] ",Response)
        this.shopCatagory = Response.data.shop_type;
        this.validateCreateProfile();


      },
      error => console.log("[Error] ",error)
    )
  }

  onSubmit() {

  }

  // readImageUrl(event:any) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  
  //     reader.onload = (event:any) => {
  //       this.sellerForm.shopImg = event.target.result;
  //     }
  
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }

  onCatagorySelected(event) {
    console.log("onCatagorySelected", event)
    this.sellerForm.shop_type_id = parseInt(event);
  }

  createSeller() {
    console.log("[This Seller] ",this.sellerForm)
    this.sellerForm.user_id = localStorage.getItem("user_id")
    this.userService.createSeller(this.sellerForm).subscribe(
      data => {
        console.log("response from create seller",data)
      },
      error => console.log(error)
    )


  }

}
