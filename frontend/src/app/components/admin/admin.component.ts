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
  private users = [];
  private display_users = [];
  private selected_user;


  constructor(
    private adminService: AdminService,
  ) {
    this.roles = ["Buyer", "Seller", "Deliver"]
  }

  ngOnInit() {
    // this.isLoad = !this.isLoad;
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
            id: element.buyer_id,
            location: element.buyer_location,
            status: element.profile_status.profile_status_name,
          }

          this.display_users[index] = temp;

        });
        this.isDeliver = true;
        this.isBuyer = true;
        this.isSeller = false;
        console.log("[this.display_users]", this.display_users)

      }
      else if (this.selectedRole == 'Buyer') {
        this.userInsystem['buyer'].forEach((element, index) => {
          console.log("element buyer",element)

          let temp = {
            id: element.seller_id,
            name: element.name,
            location: element.buyer_location,
            status: element.profile_status.profile_status_name,
          }

          this.display_users[index] = temp;

        });
        this.isDeliver = true;
        this.isBuyer = false;
        this.isSeller = true;
        console.log("[this.display_users]", this.display_users)

      }
      else if (this.selectedRole == 'Deliver') {
        this.userInsystem['deliver'].forEach((element, index) => {
          let temp = {
            id: element.shipper_id,
            bank_account_no: element.bank_account_no,
            bank_account_name: element.bank_account.bank_account_name,
            status: element.profile_status.profile_status_name,
          }

          this.display_users[index] = temp;

        });
        this.isDeliver = false;
        this.isBuyer = true;
        this.isSeller = true;
        console.log("[this.display_users]", this.display_users)


      }
    }
    else {
      console.log("[this.isHolding false]", this.isHolding)
      if (this.selectedRole == 'Seller') {
        this.holdingUsers['seller'].forEach((element, index) => {
          let temp = {
            id: element.seller_id,
            name: element.shop_name,
            location: element.shop_location,
            status: element.profile_status.profile_status_name,
          }

          this.display_users[index] = temp;

        });
        this.isDeliver = true;
        this.isBuyer = true;
        this.isSeller = false;
        console.log("[this.display seller]", this.display_users)

      }
      else if (this.selectedRole == 'Buyer') {
        this.holdingUsers['buyer'].forEach((element, index) => {
          console.log("element ",element)

          let temp = {
            id: element.buyer_id,
            location: element.buyer_location,
            status: element.profile_status.profile_status_name,
          }

          this.display_users[index] = temp;

        });
        this.isDeliver = true;
        this.isBuyer = false;
        this.isSeller = true;
        console.log("[this.display buyer]", this.display_users)

      }
      else if (this.selectedRole == 'Deliver') {
        this.holdingUsers['deliver'].forEach((element, index) => {
          let temp = {
            id: element.shipper_id,
            bank_account_no: element.bank_account_no,
            bank_account_name: element.bank_account.bank_account_name,
            status: element.profile_status.profile_status_name,
          }
          this.display_users[index] = temp;

        });
        this.isDeliver = false;
        this.isBuyer = true;
        this.isSeller = true;
        console.log("[this.display deliver]", this.display_users)


      }

    }
  }

  onClickApprove(user) {
    this.selected_user = user;
  }

  onClickReject(user) {
    this.selected_user = user;
  }

  approve() {

  }

  reject() {

  }






}
