import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private isLoad: boolean = true;
  private isMenu: boolean = false;
  private isHolding: boolean = true;

  private isBuyer: boolean = true;
  private isSeller: boolean = true;
  private isDeliver: boolean = true;

  private roles: string[];
  private selectedRole: string;
  private holdingUsers = [];
  private userInsystem = [];
  private user = [];
  private display_users = [];
  private display_seller = [];
  private display_buyer = [];
  private display_shipper = [];

  private selected_user;

  dtOptions: DataTables.Settings = {};

  constructor(
    private adminService: AdminService,
  ) {
    this.roles = ["Buyer", "Seller", "Deliver"]
  }

  ngOnInit() {
    // this.isLoad = !this.isLoad;
    this.dtOptions = {
      pagingType: 'full_numbers'
  };

  }



  holdingUser() {
    this.isMenu = !this.isMenu;
    this.isLoad = !this.isLoad;
    this.isHolding  = !this.isHolding;

    console.log("holdingUser");
    this.adminService.getAllHoldingUser(2).subscribe(
      response => {
        // console.log("[Response 2]: ", response.data);
        this.holdingUsers['seller'] = response.data;
        this.adminService.getAllHoldingUser(3).subscribe(
          response => {
            // console.log("[Response 3]: ", response.data);
            this.holdingUsers['buyer'] = response.data;
            this.adminService.getAllHoldingUser(4).subscribe(
              response => {
                // console.log("[Response 4]: ", response.data);
                this.holdingUsers['deliver'] = response.data;
                console.log("[this.holdingUsers] ", this.holdingUsers)
                this.isLoad = !this.isLoad;

              },
              error => {
                console.log("[Error]", error)
              }
            )
          },
          error => {
            console.log("[Error]", error)
          }
        )
      },
      error => {
        console.log("[Error]", error)
      }
    )



  }



  userInSystem() {
    this.isMenu = !this.isMenu;
    this.isLoad = !this.isLoad;
    console.log("userInSystem");
    this.adminService.getAllUserInSystem(2).subscribe(
      response => {
        // console.log("[Response 2]: ", response.data);
        this.userInsystem['seller'] = response.data;
        this.adminService.getAllUserInSystem(3).subscribe(
          response => {
            // console.log("[Response 3]: ", response.data);
            this.userInsystem['buyer'] = response.data;
            this.adminService.getAllUserInSystem(4).subscribe(
              response => {
                // console.log("[Response 4]: ", response.data);
                this.userInsystem['deliver'] = response.data;
                console.log("[this.userInSystem] ", this.holdingUsers)
                this.isLoad = !this.isLoad;


              },
              error => {
                console.log("[Error]", error)
              }
            )
          },
          error => {
            console.log("[Error]", error)
          }
        )
      },
      error => {
        console.log("[Error]", error)
      }
    )
  }

  setUpPage() {
    return new Promise(function(resolve, reject) {
      this.roles.forEach((element,index) => {
        if(this.roles.length <= index) {
          this.selectedRole = element;
          this.searchByRole()
        }
        else {
          resolve
        }

    });
    });
    
  }



  onRoleSelected(role) {
    console.log("onBankSelected", role)
    this.selectedRole = role;
  }


  searchByRole() {
    console.log("[selectedRole] ", this.selectedRole);
    this.display_users = [];
    if (this.isHolding) {
      console.log("[this.isHolding true]", this.isHolding)

      if (this.selectedRole == 'Seller') {
        this.userInsystem['seller'].forEach((element, index) => {
          console.log("element ",element)

          let temp = {
            profile_id: element.profile_id,
            id: element.seller_id,
            name: element.shop_name,
            location: element.shop_location,
            email: element.user.email,
            status: element.profile_status.profile_status_name,
          }

          this.display_seller[index] = temp;

        });
        this.isDeliver = true;
        this.isBuyer = true;
        this.isSeller = false;
        console.log("[this.display_seller]", this.display_seller)

      }
      else if (this.selectedRole == 'Buyer') {
        this.userInsystem['buyer'].forEach((element, index) => {
          console.log("element buyer",element)

          let temp = {
            profile_id: element.profile_id,
            id: element.buyer_id,
            name: element.user.firstname,
            location: element.buyer_address,
            status: element.profile_status.profile_status_name,
            email: element.user.email,

          }

          this.display_buyer[index] = temp;

        });
        this.isDeliver = true;
        this.isBuyer = false;
        this.isSeller = true;
        console.log("[this.display_buyer]", this.display_buyer)

      }
      else if (this.selectedRole == 'Deliver') {
        this.userInsystem['deliver'].forEach((element, index) => {
          let temp = {
            id: element.shipper_id,
            profile_id: element.profile_id,
            name:element.user.firstname + '' +element.user.lastname,
            bank_account_no: element.bank_account_no,
            bank_account_name: element.bank_account.bank_account_name,
            email: element.user.email,
            status: element.profile_status.profile_status_name,
          }

          this.display_shipper[index] = temp;

        });
        this.isDeliver = false;
        this.isBuyer = true;
        this.isSeller = true;
        console.log("[this.display_shipper]", this.display_shipper)


      }
    }
    else {
      console.log("[this.isHolding false]", this.isHolding)
      if (this.selectedRole == 'Seller') {
        this.holdingUsers['seller'].forEach((element, index) => {
          let temp = {
            id: element.seller_id,
            profile_id: element.profile_id,
            name: element.shop_name,
            location: element.shop_location,
            status: element.profile_status.profile_status_name,
          }

          this.display_seller[index] = temp;

        });
        this.isDeliver = true;
        this.isBuyer = true;
        this.isSeller = false;
        console.log("[this.display seller]", this.display_seller)

      }
      else if (this.selectedRole == 'Buyer') {
        this.holdingUsers['buyer'].forEach((element, index) => {
          console.log("element ",element)

          let temp = {
            id: element.buyer_id,
            location: element.buyer_location,
            profile_id: element.profile_id,
            status: element.profile_status.profile_status_name,
          }

          this.display_buyer[index] = temp;

        });
        this.isDeliver = true;
        this.isBuyer = false;
        this.isSeller = true;
        console.log("[this.display_buyer]", this.display_buyer)

      }
      else if (this.selectedRole == 'Deliver') {
        this.holdingUsers['deliver'].forEach((element, index) => {
          let temp = {
            id: element.shipper_id,
            bank_account_no: element.bank_account_no,
            bank_account_name: element.bank_account.bank_account_name,
            status: element.profile_status.profile_status_name,
            profile_id: element.profile_id,
          }
          this.display_shipper[index] = temp;

        });
        this.isDeliver = false;
        this.isBuyer = true;
        this.isSeller = true;
        console.log("[this.display_shipper]", this.display_shipper)


      }

    }
  }

  onChangeStatus(event,user) {
    console.log("onChangeStatus event ",event)
    console.log("onChangeStatus user ",user);
  }

  onClickApprove(user) {
    this.selected_user = user;
  }

  onClickReject(user) {
    this.selected_user = user;
  }

  onClickUpdate(user,status) {
    console.log("[user] ",user)
    let role_id;
    if(!this.isDeliver) {
      role_id = 4
    }
    else if(!this.isSeller) {
      role_id =2
    }
    else if(!this.isBuyer) {
      role_id =3
    }
    let body = {
      "id": user.id,
      "role_id": role_id,
      "profile_status_id": status
    }
    console.log("[body] ",body)
    this.adminService.updateUserStatus(body)
    .subscribe(response => {
      console.log("[Response] ",response);
      
    },
    error => {
      console.log("[Error] ",error);
    })

  }

  approve() {

  }

  reject() {

  }






}
