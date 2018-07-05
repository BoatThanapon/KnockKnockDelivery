import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private validSeller: Boolean;
  private validBuyer: Boolean;
  private validDeliver: Boolean;
  private isAdmin:Boolean = false;
  private isShow: Boolean;

  private isSellerProfile: Boolean;
  private isBuyerProfile: Boolean;
  private isDeliverProfile: Boolean;

  private adminProfile;
  private userProfile;
  private sellerProfile;
  private buyerProfile;
  private deliverProfile;

  constructor(
    private userService: UserService,
    private router: Router

  ) { }

  ngOnInit() {
    this.isShow = false;
    this.validSeller = false;
    this.validBuyer = false;
    this.validDeliver = false;
    this.isSellerProfile = false;
    this.isBuyerProfile = false;
    this.isDeliverProfile = false;
    this.getUserProfile();


  }


  getUserProfile() {
    var id = localStorage.getItem('user_id');

    this.userService.getUserProfile(id).subscribe(
          response => {
            console.log("[Response] ",response.data)
            if(response.data.seller != null) {
              this.sellerProfile = response.data.seller
              this.validSeller = true;
            }
            if(response.data.buyer != null) {
              this.buyerProfile = response.data.buyer
              this.validBuyer = true;
            }
            if(response.data.shipper != null) {
              this.deliverProfile = response.data.shipper
              this.validDeliver = true;
            }

            this.isShow = true;

          },
          error => {
            console.log("[Error] ",error)
          });
  }

  // async getUserProfile() {
  //   var id = localStorage.getItem('user_id');
  //   this.userService.getUserProfile(id).subscribe(
  //     data => {
  //       this.userProfile = data;
  //       if (this.userProfile.data.length != 0) {
  //         console.log("this.userProfile", this.userProfile.data);

  //         this.userProfile.data.forEach(async (profile,idx) => {
  //           console.log("idx: ",idx);
  //           console.log("this.userProfile: ",this.userProfile.data.length)
  //           if(profile.role.role_id == 1) {
  //             // this.adminProfile = await this.fetchProfileDetail(profile);
  //             this.isAdmin = !this.isAdmin;
  //           }
  //           if (profile.role.role_id == 2) {
  //             this.sellerProfile = await this.fetchProfileDetail(profile)
  //             console.log("sellerProfile: ", this.sellerProfile)
  //             this.validSeller = true;
  //           }
  //           if (profile.role.role_id == 3) {
  //             this.buyerProfile = await this.fetchProfileDetail(profile)
  //             console.log("buyerProfile: ", this.buyerProfile)
  //             this.validBuyer = true;
  //           }
  //           if (profile.role.role_id == 4) {
  //             this.deliverProfile = await this.fetchProfileDetail(profile)
  //             console.log("deliverProfile: ", this.deliverProfile)
  //             this.validDeliver = true;
  //           }
  //           if ((idx+1) == this.userProfile.data.length) {
  //             this.callback();
  //           }        
  //         })
  //       }
  //       else{
  //         console.log("Empty profile")
  //         this.isShow = true;
  //       }
  //     },
  //     error => console.log(error)
  //   )
  // }

  callback() {
    this.isShow = true;
  }

  editBuyer() {
    console.log("Edit buyer")
  }

  createProfile(id) {
    console.log("createProfile", id);
    localStorage.setItem("create-profile-id", id);
    this.router.navigateByUrl('/create-profile')

  }

  async fetchProfileDetail(profile) {
    return this.userService.fetchProfileDetail(profile)

  }

  enterManageShop(sellerProfile) {
    console.log('enterManageShop')
    localStorage.setItem("seller",JSON.stringify(sellerProfile));
    this.router.navigateByUrl('/manage-shop')
  }

  enterShops() {
    this.router.navigateByUrl('/shops')

  }

  enterDeliver() {
    localStorage.setItem('seller_id',this.deliverProfile.profile_id)
    this.router.navigateByUrl('/deliver')
  }







}
