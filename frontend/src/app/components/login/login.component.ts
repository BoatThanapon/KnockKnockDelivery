import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private form = {
    email: null,
    password: null
  }
  private error = null
  private rotate;
  isClick: boolean = false;
  isShow: boolean = false;



  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
    this.rotate = document.getElementById("flipper");

  }

  onSubmit() {
    console.log('[onSubmit] ',this.form);
    
    this.isClick = !this.isClick;    
    this.isShow = !this.isShow; 
    if(this.form.email == "") {
      this.isShow = !this.isShow;   
      this.isClick = !this.isClick;    
      this.error = 'The email field is required';
    }  
    if(this.form.password == "") {
      this.isShow = !this.isShow;   
      this.isClick = !this.isClick;    
      this.error = 'The password field is required';
    }
    if(this.form.email == "" && this.form.password == "") {
      this.isShow = !this.isShow;   
      this.isClick = !this.isClick;    
      this.error = 'The email and password field is required';
    }
    else if(this.form.email != "" && this.form.password != ""){
      this.authService.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
    }

  }

  handleResponse(data) {
    this.authService.setToken(data.access_token)
    .then(() => {
      return this.authService.changeAuthStatus(true)
    })
    .then(() => {
      return this.authService.setUserProfile(data)
    })
    .then(() => {
      this.router.navigateByUrl('/profile')
    })
    .catch(error => {
      console.log("[Error] ",error)
    });

  }

  handleError(error) {
    this.isShow = !this.isShow;   
    this.isClick = !this.isClick;    
    this.error = 'Email or password wrong';

  }


}
