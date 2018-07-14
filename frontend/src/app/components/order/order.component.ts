import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private orders = [];
  constructor(
    private BuyerService: BuyerService,

  ) { }

  ngOnInit() {
    this.getOrder()
  }

  getOrder() {
    // this.orders = JSON.parse(localStorage.getItem('orders'));
    // console.log("[orders] ",this.orders)
    let id = localStorage.getItem('buyer_id')
    this.BuyerService.getOrderByBuyerId(id)
    .subscribe(response => {
      console.log("[response] ", response)
      this,this.orders = response.data
      , error => {
        console.log('error',error);
      }
    })
  }

}
