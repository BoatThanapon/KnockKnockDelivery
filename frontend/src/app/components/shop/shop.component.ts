import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';
import { SellerService, address } from '../../services/seller.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

    private baseUrl = 'http://localhost:8000';
    private products;
    private isEdit:boolean = false;
    private isShow: boolean = true;
    private isEmpty: boolean = false;
    private cart_num = 0;
    private seller = [];
    private user;
    private error = [];
    private seller_id;
    private form = {
        product_name: null,
        product_description: null,
        product_price: null,
        product_image_1:null
    }
    private orders_num = 0;
    private shop = [];
    private buyer_profile = {
      buyer_address:'',
      buyer_id:'',
      profile_id:'',
      profile_status:{
        profile_status_id:'',
        profile_status_name:''
      }
    }
    user_form = {
      firstname: 'Hello',
      lastname: '',
      identity_no: '',
      telephone_number: '',
    }
    shop_latitude: any;
    shop_longtitude: any;
    labelOptionShop = {
      color: '#fff',
      fontFamily: '',
      fontSize: '15px',
      fontWeight: 'bold',
      text: 'S',
      }
      address = {
        address_components: null,
        formatted_address: null
      };




    constructor(
        private BuyerService: BuyerService,
        private SellerService: SellerService,
        private router: Router,
        private authService: AuthService,

    ) { }

    ngOnInit() {
        this.setCartNum();
        this.setSellerID();
        this.setOrderNum();
        this.getUserProfile();
    }

    setSellerID() {
      this.seller_id = localStorage.getItem('seller_id');
      this.getAllProduct();
      this.getShopDetail();
    }

    getAllProduct() {
      console.log("Seller id = ",this.seller_id)
      this.SellerService.getAllProducts(this.seller_id)
      .subscribe(response => {
        console.log("[Response] getAllProduct",response.data);
        this.products = response.data;
        if(this.products.length > 0){
          this.isEmpty = true
        }
        this.getBuyerProfile();
        this.showgetGoogleMapAddress(this.shop_latitude, this.shop_longtitude);

        // this.isShow = !this.seller_id
      },
      error => {
        console.log("[Error] ",error);

      })
    }

    getShopDetail() {
      this.seller = JSON.parse(localStorage.getItem('shop'))
      this.shop_latitude = +this.seller["shop_latitude"]
      this.shop_longtitude = +this.seller["shop_longitude"]

    }

    showgetGoogleMapAddress(lat,lng) {
      this.SellerService.getGoogleMapAddress(lat,lng)
        .subscribe((data: address) => {
          console.log("[Response Address] ",data.results[0]);
          this.address = data.results[0]});
    }

    getBuyerProfile() {
      let id = JSON.parse(localStorage.getItem('buyer')).profile_id
      this.BuyerService.getBuyerByProfileId(id).subscribe(
        Response=> {
          console.log("[Response] getBuyerProfile: ",Response.data)
          this.buyer_profile = Response.data[0]
          this.isShow = !this.isShow;    
  
        }
        ,error => {
          console.log("[Error] getBuyerProfile: ",error)
          this.isShow = !this.isShow;    
        });
  
    }

    

  openInfo(product){
    console.log("onClick product: ",product)
    this.form.product_name= product.product_name
    this.form.product_description= product.product_description
    this.form.product_price=product.product_price
    this.form.product_image_1=product.product_image_1

  }

  setCartNum(){
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log("cart: ",cart);

    if(cart != null) {
          this.cart_num = cart.length;
    } 
    else if(cart == {}) {
      this.cart_num = 0;

    }

  }

  addToCart(product) {
    console.log("addToCart: ",product)

    product.seller.shop_latitude = this.shop_latitude
    product.seller.shop_longtitude = this.shop_longtitude

    let cart = JSON.parse(localStorage.getItem("cart"));
    if(cart == null){
      let obj = [];
      obj['seller_id'] = this.seller_id
      obj.push(product);
      // console.log("product: ",product);
      localStorage.setItem("cart",JSON.stringify(obj));
      this.setCartNum();

    }
    else{
      cart.push(product)
      console.log("cart: ",cart);
      localStorage.setItem("cart",JSON.stringify(cart));
      this.setCartNum();

    }
  }

  goToCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));

    console.log("Cart : ",cart)

    if(cart == null) {
      localStorage.setItem("cart","[]");
    }

    this.router.navigateByUrl('/cart')
  }

  goToOrder() {
    this.router.navigateByUrl('/order')

  }

  goToShops() {
    this.router.navigateByUrl('/shops')

  }

  setOrderNum(){
    // let orders = JSON.parse(localStorage.getItem("orders"));
    // console.log("orders: ",orders);
    // if(orders != null) {
    //       this.orders_num = orders.length;
    // } 
    // else if(orders == {}) {
    //   this.orders_num = 0;
    // }

    let id = localStorage.getItem('buyer_id')
    this.BuyerService.getOrderByBuyerId(id)
    .subscribe(response => {
      console.log("[response] ", response)
      this.orders_num = response.data.length
      , error => {
        console.log('error',error);
      }
    })


  }


  onEditBuyer() {
    let id = localStorage.getItem('buyer_id')
    console.log("[buyer] ",this.buyer_profile)
    this.error['buyer_address'] = false
    this.error['firstname'] = false
    this.error['lastname'] = false
    this.error['identity_no'] = false
    this.error['telephone_number'] = false

    if(this.buyer_profile.buyer_address.length == 0) {
      this.error['buyer_address'] = 'Please fill in address.'
    }
    if(this.user_form.firstname.length == 0) {
      this.error['firstname'] = 'Please fill in first name.'
    }
    if(this.user_form.lastname.length == 0) {
      this.error['lastname'] = 'Please fill in last name.'
    }
    if(this.user_form.identity_no.length == 0) {
      this.error['identity_no'] = 'Please fill in citizen id'
    }
    if(this.user_form.telephone_number.length == 0) {
      this.error['telephone_number'] = 'Please fill in telephone number'
    }
    else {
      let temp = {
        buyer_address: this.buyer_profile.buyer_address,
        profile_status_id: 1
      }
      this.user_form.telephone_number = '0' + this.user_form.telephone_number.toString();
      this.updateProfile();
      this.BuyerService.updateBuyer(temp,id)
      .subscribe(response => {
        console.log("[response] onEditBuyer: ",response)
      }
      ,error => {console.log("[error] onEditBuyer: ",error)}
    )}

  }


  getUserProfile() {
    let id = localStorage.getItem('user_id')
    this.authService.me()
    .subscribe(response => {
      console.log('[response] getUserProfile: ',response);
      this.user = response

      this.user_form.firstname = this.user.firstname;
      this.user_form.lastname = this.user.lastname;
      this.user_form.identity_no = this.user.identity_no;
      this.user_form.telephone_number = this.user.telephone_number;
    },error => {
      console.log('[response] getUserProfile: ',error);

    }) 
  }

  updateProfile() {
    let id = localStorage.getItem('user_id')
    return new Promise((resolve,reject) => {
      this.authService.editUser(id,this.user_form)
      .subscribe(response => {
        console.log('[response] updateProfile: ',response);
        alert('Update profile success')
        resolve(response)
        
      }, error => {
        console.log('[error] updateProfile: ',error);
        reject(error)

  
      })
    })

  }


}
