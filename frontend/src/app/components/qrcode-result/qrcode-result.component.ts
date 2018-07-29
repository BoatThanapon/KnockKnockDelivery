import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode-result',
  templateUrl: './qrcode-result.component.html',
  styleUrls: ['./qrcode-result.component.css']
})
export class QrcodeResultComponent implements OnInit {

  constructor(
    private OrderService: OrderService,
    private router: Router

  ) { }

  private isLoad:Boolean = true;
  private uri;
  private result;

  ngOnInit() {
    this.uri = localStorage.getItem('qr-code-result')
    this.filterResult(this.uri);
  }

  filterResult(uri) {
    let temp = uri.split('/')
    console.log('[split] temp',temp);
    if(temp[4] === 'seller') {
      this.scan_seller(temp[6])
    }
    else if(temp[4] === 'buyer') {
      this.scan_buyer(temp[6])
    }

    
  }



  scan_seller(order_id) {
    let order = JSON.parse(localStorage.getItem('order'))
    let body = {
      order_status_id:5
    }
    this.OrderService.QRcodeUpdateStatusOrderByOrderId(order.order_id,body)
    .subscribe(response => {
      console.log('[reeponse] scan_seller',response);
      // alert('Success scan@seller')
      this.result = response.result
      this.isLoad =! this.isLoad
    },error => {
      console.log('[error] scan_seller',error);
      this.isLoad =! this.isLoad
      alert('Fail scan@seller')

    })
  }

  scan_buyer(order_id) {
    let order = JSON.parse(localStorage.getItem('order'))
    let body = {
      order_status_id:6
    }
    this.OrderService.QRcodeUpdateStatusOrderByOrderId(order.order_id,body)
    .subscribe(response => {
      console.log('[reeponse] scan_buyer',response);
      this.isLoad =! this.isLoad
      this.result = response.result


    },error => {
      console.log('[error] scan_buyer',error);
      this.isLoad =! this.isLoad
      alert('Fail scan@buyer')

    })
  }

  acceptScanResult() {
    this.router.navigateByUrl('/order')

  }

}
