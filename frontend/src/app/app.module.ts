import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ApplicationRef  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { ManageShopComponent } from './components/manage-shop/manage-shop.component';
import { ShopComponent } from './components/shop/shop.component';
import { ShopsComponent } from './components/shops/shops.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

import { DataTablesModule } from 'angular-datatables';
import { TableDataComponent } from './components/table-data/table-data.component';
import { EditShopComponent } from './components/edit-shop/edit-shop.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { DeliverComponent } from './components/deliver/deliver.component';

import { AgmCoreModule } from '@agm/core';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    DashboardComponent,
    CreateProfileComponent,
    ManageShopComponent,
    ShopComponent,
    ShopsComponent,
    CreateProductComponent,
    TableDataComponent,
    EditShopComponent,
    AdminComponent,
    CartComponent,
    DeliverComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxWHu3Ev8Dh8V2gQxzU_dTl9CwWv9P3R8'
    })
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
