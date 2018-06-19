import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  private products;
  private isLoad;


  constructor(
    private BuyerService: BuyerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoad = true;
    this.getAllProducts();

  }

  getAllProducts() {
    this.BuyerService.getAllProducts().subscribe(
      response => {
        console.log("getAllProducts: ",response.data);
        this.products = response.data;
        this.isLoad = false;


      }
      ,
      error => console.log(error)
    )

  }

}
