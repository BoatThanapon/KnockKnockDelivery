import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { callbackify } from 'util';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private userProfile;
  private validSeller:Boolean;
  private validBuyer:Boolean;
  private validDeliver:Boolean;
  private isShow:Boolean;


  constructor(
    private userService: UserService,
    private router: Router

  ) { }

  ngOnInit() {
    this.isShow = false;
    this.validSeller = false;
    this.validBuyer = false;
    this.validDeliver = false;
    this.getUserProfile();
  }

  getUserProfile() {
    var id = localStorage.getItem('user_id');
    this.userService.getUserProfile(id).subscribe(
      data => {
        this.userProfile = data;
        if (this.userProfile.data != undefined) {
          console.log("this.userProfile",this.userProfile.data);
          this.userProfile.data.forEach(profile => {
            if(profile.role.role_id == 2){
              this.validSeller = true;
            }
            else if(profile.role.role_id == 3){
              this.validBuyer = true;
            }
            else if(profile.role.role_id == 4){
              this.validDeliver = true;
            }
          });
          this.isShow = true;


        }
      },
      error => console.log(error)
    )
  }


  createProfile(id) {
    console.log("createProfile",id);
    localStorage.setItem("create-profile-id",id);
    this.router.navigateByUrl('/create-profile')


  }




}
