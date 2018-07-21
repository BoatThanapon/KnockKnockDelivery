import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../../services/buyer.service';
import { DeliverService } from './../../services/deliver.service';
import { OrderService } from './../../services/order.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private orders = [];
  private upload_order = {
    order_id: '', 
    order_status: {}, 
    updated_at: ''
  };
  private upload_img;
  private isEmpty:boolean = true;
  private isShow:boolean = true;
  private isBuyer:boolean = true;
  private isShipper:boolean = true;
  private imageUrl;
  private seeMore_form = {}
  constructor(
    private BuyerService: BuyerService,
    private DeliverService: DeliverService,
    private OrderService: OrderService,
    private router: Router

  ) { }

  ngOnInit() {
    this.checkFrom()
  }

  checkFrom() {
    let buyer = JSON.parse(localStorage.getItem('buyer'))
    let deliver = JSON.parse(localStorage.getItem('deliver'))
    console.log("[buyer] ",buyer);
    console.log("[deliver] ",deliver);

    if(buyer != null){
      this.getBuyerOrder(buyer);
      this.isBuyer = !this.isBuyer;
    }
    else if(deliver != null) {
      this.getDeliverOrder(deliver);
      this.isShipper = !this.isShipper
    }
  }

  getBuyerOrder(buyer) {

    let id = buyer.buyer_id;
    this.BuyerService.getOrderByBuyerId(id)
    .subscribe(response => {
      console.log("[response] ", response.data.length)
      this.orders = response.data
      this.isShow = ! this.isShow
      if(this.orders.length>0)
      this.isEmpty = !this.isEmpty
    }, 
    error => {
      console.log('error',error);
    })
  }

  getDeliverOrder(deliver) {

    let id = deliver.shipper_id;
    this.DeliverService.getOrderByDeliverId(id)
    .subscribe(response => {
      console.log("[response] ", response.data.length)
      this.orders = response.data
      this.isShow = ! this.isShow
      if(this.orders.length>0)
      this.isEmpty = !this.isEmpty
      , error => {
        console.log('error',error);
      }
    })
  }


  getOrderDetail(id) {
    return new Promise((resolve, reject) => {
      this.OrderService.getOrderDetail(id)
      .subscribe(response => {
        console.log("[response] getOrderDetail: ",response.data);
        resolve(response.data);
      }, error => {
        console.log("[error] getOrderDetail: ",error);
        reject(error)
      })
    });
    


  }

  seeMore(order) {
    this.isShow = !this.isShow
    this.getOrderDetail(order.order_id)
    .then(result => {
      console.log("[detail] seeMore: ",result);
      this.seeMore_form = result
      this.isShow = !this.isShow

    }).catch(error => {
      console.log("[error] seeMore: ",error);

    })

  }

  scanQRCode() {
    console.log('Scan QR Code');
    this.router.navigateByUrl('/scanner')

  }

  openQrCode(order) {
    // this.isShow = !this.isShow
    // console.log('Open QR Code',order);
    // this.OrderService.getDataQRcodeBuyerByOrderId(order.order_id)
    // .subscribe(response => {
    //   console.log('[response] openQrCode: ',response);
    //   this.isShow = !this.isShow
    // },error => {
    //   console.log('[error] openQrCode: ',error);

    // })
  }

  uploadTransfer(order) {
    this.upload_order = order;
    console.log("[upload transfer] ",order);
  }

  updateOrder() {
    this.isShow = !this.isShow

    let form = new FormData();
    form.append("payment_transfer_slip",this.upload_img);

    this.OrderService.UploadTransferSlipByOrderId(this.upload_order.order_id,form)
    .subscribe(response => {
      this.isShow = !this.isShow
      console.log("[upload response] ",response);

    },error => {
      alert("Upload image fail")
      this.isShow = !this.isShow

    })


  }

  preview(file: FileList): void {
    this.upload_img = file.item(0)
    console.log("[fileUpload] ",this.upload_img);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result
    }
    reader.readAsDataURL(this.upload_img)

  }

}
