import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form = {
    firstname: null,
    lastname: null,
    identity_no: null,
    telephone_number: null,
    email: null,
    password: null,
    password_confirmation: null,

  }
  isValid: boolean = false;
  isShow: boolean = false;
  error = []

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onChange() {
    console.log("onChange ");

    if (this.form.firstname != null && this.form.lastname != null && this.form.identity_no != null && this.form.telephone_number != null && this.form.email != null && this.form.password != null && this.form.password_confirmation != null) {
      console.log("isValid");

      this.isValid = true;
    }
  }

  onSubmit() {
    console.log("onSubmit signup: ",this.form);
    this.isShow = !this.isShow

    if (this.form.firstname != null || this.form.lastname != null || this.form.identity_no != null || this.form.telephone_number != null || this.form.email != null || this.form.password != null || this.form.password_confirmation != null) {
      if(this.form.password == null && this.form.password_confirmation == null) {
        alert('Password and confirm password must contain more than 8 character long')
        return;
      }
      else if (this.form.password.length < 8 || this.form.password_confirmation.length < 8 ) {
        this.error['password'] = 'Password and confirm password must contain more than 8 character long';
      }
      else if (this.form.password != this.form.password_confirmation) {
        this.error['password'] = 'Password and confirm password not match';
      }
      else if(this.form.identity_no == null  ) {
        this.error['identity_no'] = 'Identity is require';

      }
      else if (this.form.identity_no.length < 13) {
        this.error['identity_no'] = 'Identity no must more than 13 digit';
      }
      else {
        this.isValid = !this.isValid
        this.authService.signup(this.form).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        )
      }
    }
    else {
      alert("All input required")
    }


  }

  handleResponse(data) {
    this.isShow = !this.isShow
    this.authService.handleToken(data.access_token)
    this.authService.changeAuthStatus(true)
    this.authService.setUserId(data.user.user_id)
    this.router.navigateByUrl('/profile')

  }

  handleError(error) {
    this.isValid = !this.isValid
    this.isShow = !this.isShow
    this.error = error.error.errors;

  }

}
