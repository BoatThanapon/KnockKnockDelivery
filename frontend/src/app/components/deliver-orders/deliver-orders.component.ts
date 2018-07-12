import { Component, OnInit } from '@angular/core';
import { DeliverService } from '../../services/deliver.service';
import { OrderService } from '../../services/order.service';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-deliver-orders',
  templateUrl: './deliver-orders.component.html',
  styleUrls: ['./deliver-orders.component.css']
})
export class DeliverOrdersComponent implements OnInit {

  private orders = [];
  private orderDetail = [];
  private isShow:boolean = true;

  constructor(
    private deliverService: DeliverService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.getShopOrders()
    
  }

  getShopOrders() {
    let id = localStorage.getItem('seller_order_id');
    // return new Promise(function(resolve, reject) {


    // });
    this.orderService.getOrderBySellerId(id)
    .subscribe(response => {
      console.log("[response] ",response)
      this.orders = response.data;
      // this.getOrderDetail(this.orders)
      this.isShow = !this.isShow

    },error => {
      console.log("[error] ",error)
    })

  }

  getOrderDetail(orders) {
    console.log("[getOrderDetail] ",orders)
    orders.forEach((element,idx) => {
      this.orderService.getOrderDetail(element.order_id)
      .subscribe(response => {
        console.log("[response] ",response )
        // element['order_total_price'] = response.data.order_total_price;
      },error => {
        console.log("[error] ",error )
      })
      console.log("[getOrderDetail] ",orders.length)
      console.log("[idx] ",idx)

      if(orders.length-1 === idx) {
        this.isShow = !this.isShow
      }

    })


  }

  acceptOrder(order) {
    console.log("[Accept Order] ",order)
    this.isShow = !this.isShow
    let body = {
      order_status_id: 2
    }
    this.orderService.updateOrder(order.order_id,body)
    .subscribe(response => {
      console.log("[response] ",response)
      this.isShow = !this.isShow
      alert('Sucess accept this order')
      localStorage.setItem('order',order)

    }
    ,error => {
      console.log("[error] ",error)
      alert('Fail to accept this order')

    });
  }



}