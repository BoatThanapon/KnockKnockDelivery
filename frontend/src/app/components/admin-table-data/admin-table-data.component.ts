import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../../services/seller.service';
import { AdminService } from '../../services/admin.service';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-admin-table-data',
  templateUrl: './admin-table-data.component.html',
  styleUrls: ['./admin-table-data.component.css']
})
export class AdminTableDataComponent implements OnInit {

  @Input() _headers: Object;
  @Input() data_history: Object;
  @Input() _type: String;

  @Output() reloadPage = new EventEmitter();

  private baseUrl = 'http://localhost:8000';
  private isShow:boolean = true;

  private headers;
  private data;

  private order = {

    order_id:'',
    order_total_price:'',
    receiver_firstname:'',
    receiver_lastname:'',
    service_charge:'',
    shipper: {
      user:{
        firstname:'',
        lastname:'',
        telephone_number:''
      }
    },
    updated_at:'',
    buyer: {
      user: {
        firstname:'',
        lastname:'',
        telephone_number:'',
      }
    },

  }

  private product = {

  }

  constructor(
    private modalService: NgbModal,
    private sellerService: SellerService,
    private adminService: AdminService,
    private orderService: OrderService,

  ) { }

  ngOnInit() {
    this.setPage();
  }

  setPage() {
    this.headers = this._headers;
    this.data = this.data_history;
  }

  openOrderInfo(order) {
    this.isShow = !this.isShow
    this.getOrderDetail(order.order_id)
    .then(result => {
      console.log("[detail] seeMore: ",result);
      this.order = result
      this.isShow = !this.isShow

    }).catch(error => {
      console.log("[error] seeMore: ",error);

    })
  }

  getOrderDetail(id) {
    return new Promise((resolve, reject) => {
      this.orderService.getOrderDetail(id)
      .subscribe(response => {
        console.log("[response] getOrderDetail: ",response.data);
        resolve(response.data);
      }, error => {
        console.log("[error] getOrderDetail: ",error);
        reject(error)
      })
    });
    


  }

  openQRCode(order) {

  }

}
