import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SellerService } from '../../services/seller.service';

import { Router } from '@angular/router';

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


  sellerForm = {
    shop_name: null,
    shop_location: null,
    shop_type_id:null,
    user_id:null,
    shop_logo_image: null,
    shop_latitude:null,
    shop_longitude:null
  }

  buyerForm = {
    buyer_location: null,
    user_id: null,
  }

  deliverForm = {
    bank_account_id: null,
    bank_account_no: null,
    shipper_transfer_slip: null,
    user_id: null,

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
  private bankAcc;



  error = []



  constructor(    
    private userService: UserService,
    private sellerService: SellerService,

  ) { }

  ngOnInit() {
    this.fetchMasterType();
    this.setBankAccount();
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

  setBankAccount() {
    this.bankAcc = JSON.parse(localStorage.getItem('masterData')).bank_account;
  }

  onBankSelected(event) {
    console.log("onBankSelected", event)
    this.deliverForm.bank_account_id = parseInt(event);
  }


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

  createDeliver() {
    console.log("[This deliver] ",this.deliverForm)
    this.deliverForm.user_id = localStorage.getItem("user_id")
    this.userService.createDeliver(this.deliverForm).subscribe(
      data => {
        console.log("response from create deliver",data)
      },
      error => console.log(error)
    )
  }

  createBuyer() {
    console.log("[This Buyer] ",this.buyerForm)
    this.buyerForm.user_id = localStorage.getItem("user_id")
    this.userService.createSeller(this.buyerForm).subscribe(
      data => {
        console.log("response from create buyer",data)
      },
      error => console.log(error)
    )

  }

}
