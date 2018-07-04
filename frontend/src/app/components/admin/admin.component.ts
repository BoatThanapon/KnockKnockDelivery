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
  private isHolding: boolean = false;

  private roles: string[];
  private selectedRole: string;
  private holdingUsers = [];
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

    console.log("holdingUser");
    this.adminService.getAllHoldingUser(2).subscribe(
      response => {
        console.log("[Response 2]: ", response.data);
        this.holdingUsers['seller'] = response.data;
        this.adminService.getAllHoldingUser(3).subscribe(
          response => {
            console.log("[Response 3]: ", response.data);
            this.holdingUsers['buyer'] = response.data;
            this.adminService.getAllHoldingUser(4).subscribe(
              response => {
                console.log("[Response 4]: ", response.data);
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
        console.log("[Response 2]: ", response.data);
        this.holdingUsers['seller'] = response.data;
        this.adminService.getAllUserInSystem(3).subscribe(
          response => {
            console.log("[Response 3]: ", response.data);
            this.holdingUsers['buyer'] = response.data;
            this.adminService.getAllUserInSystem(4).subscribe(
              response => {
                console.log("[Response 4]: ", response.data);
                this.holdingUsers['deliver'] = response.data;
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


  searchByRole() {
    console.log("[selectedRole] ", this.selectedRole);
    if (this.isHolding) {
      console.log("[this.isHolding true]", this.isHolding)

    }
    else {
      console.log("[this.isHolding false]", this.isHolding)
      if (this.selectedRole == 'Seller') {
        this.holdingUsers['seller'].forEach((element, index) => {
          let temp = {
            id: element.seller_id,
            name: element.seller_name,
            status: element.profile_status.profile_status_name,
          }

          this.display_users[index] = temp;

        });

        console.log("[this.display_users]", this.display_users)

      }
      else if (this.selectedRole == 'Buyer') {
        this.holdingUsers['buyer'].forEach((element, index) => {
          let temp = {
            id: element.buyer_id,
            name: element.buyer_firstname + ' ' + element.buyer_lastname,
            status: element.profile_status.profile_status_name,
          }

          this.display_users[index] = temp;

        });
        console.log("[this.display_users]", this.display_users)

      }
      else if (this.selectedRole == 'Deliver') {
        this.holdingUsers['deliver'].forEach((element, index) => {
          let temp = {
            id: element.deliver_id,
            name: element.deliver_firstname + ' ' + element.deliver_lastname,
            status: element.profile_status.profile_status_name,
          }

          this.display_users[index] = temp;

        });
        console.log("[this.display_users]", this.display_users)


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
