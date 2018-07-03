import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';
import { SellerService } from '../../services/seller.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

    private products;
    private isShow: boolean = true;
    private cart_num = 0;
    private form = {
        product_name: null,
        product_description: null,
        product_price: null
    }

    private shop = {
        shop_name: null,
        shop_type: null,
        shop_location: null
    }


    constructor(
        private BuyerService: BuyerService,
        private SellerService: SellerService,

        private router: Router
    ) { }

    ngOnInit() {
        this.getAllProducts();
        this.setCartNum();
    }

    
  getAllProducts() {
    this.BuyerService.getAllProducts().subscribe(
      response => {
        console.log("getAllProducts: ", response.data);
        this.products = response.data;
        this.setCartNum();
    },
      error => console.log(error)
    )

  }

  openInfo(product){
    console.log("onClick product: ",product)
    this.form.product_name= product.product_name,
    this.form.product_description= product.product_description,
    this.form.product_price=product.product_price
  }

  setCartNum(){
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log("Cart lenght: ",cart.length)
    this.cart_num = cart.length;

  }

}
