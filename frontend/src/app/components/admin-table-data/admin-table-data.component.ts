import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../../services/seller.service';
import { AdminService } from '../../services/admin.service';
import { OrderService } from '../../services/order.service';
import { ClassGetter } from '../../../../node_modules/@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-admin-table-data',
  templateUrl: './admin-table-data.component.html',
  styleUrls: ['./admin-table-data.component.css']
})
export class AdminTableDataComponent implements OnInit {

  @Input() _headers: Object;
  @Input() _data: Object;
  @Input() _type: String;

  @Output() updateUser = new EventEmitter();

  private baseUrl = 'http://localhost:8000';
  private isShow:boolean = true;

  private emit_data;
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
    console.log('[ngOnInit] ' );
    console.log('[_headers] ',this._headers);
    console.log('[_data] ',this._data);
    console.log('[_type] ',this._type );


    this.setPage();
  }

  setPage() {
    this.headers = this._headers;
    this.data = this._data;

  }

  openOrderInfo(order) {
    this.isShow = !this.isShow
    this.getOrderDetail(order.order_id)
    .then(result => {
      console.log("[detail] seeMore: ",result);
      // this.order = result
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

  onClickUpdate(id,status) {
    console.log('[onClickUpdate] admin-data-table',id,status);
    this.emit_data = {id,status}
    this.updateUser.emit(this.emit_data)

  }

  openQRCode(order) {

  }

}
