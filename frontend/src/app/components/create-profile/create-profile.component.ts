import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  private create_profile_id;
  private isCreateBuyer: Boolean;
  private isCreateSeller: Boolean;
  private isCreateDeliver: Boolean;

  sellerForm = {
    sellerName: null,
    shopName: null,
    location: null,
    type: [{ model: '1' }, { model: '2' }, { model: '3' }],
    selectedType:null,
    shopImg: null,
  }

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



  constructor() { }

  ngOnInit() {
    this.isCreateBuyer = false;
    this.isCreateSeller = false;
    this.isCreateDeliver = false;
    this.validateCreateProfile();
  }

  validateCreateProfile() {
    this.create_profile_id = localStorage.getItem("create-profile-id");
    console.log("this.create_profile_id", this.create_profile_id)
    if (this.create_profile_id == 2) {
      this.isCreateSeller = true;
    }
    else if (this.create_profile_id == 3) {
      this.isCreateBuyer = true;
    }
    else if (this.create_profile_id == 4) {
      this.isCreateDeliver = true;
    }


  }

  onSubmit() {
    console.log(this.sellerForm)

  }

  readImageUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event:any) => {
        this.sellerForm.shopImg = event.target.result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
