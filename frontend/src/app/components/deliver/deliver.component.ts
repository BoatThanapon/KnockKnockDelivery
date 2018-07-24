import { Component, OnInit,ViewChild } from '@angular/core';
import { DeliverService } from '../../services/deliver.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-deliver',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.css']
})
export class DeliverComponent implements OnInit {

  private deliver_profile;
  private isShow:boolean = true;
  private isUpdate:boolean = false;
  private keyWord = '';
  private form = {
    bank_account_id:null,
    bank_account_no:null,
    profile_status_id:null,
    shipper_transfer_slip_Image:null,
    selected_bank:null

  }
  private dafault_bank;
  private error;
  private orders = [];
  private bankAcc;
  private orders_num = 0;
  private imageUrlTransfer = null;

  @ViewChild("mycanvas") mycanvas;

  constructor(
    private deliverService: DeliverService,
    private orderService: OrderService,
    private router: Router

  ) { }

  ngOnInit() {
    this.getProfile();
    this.setBankAccount();
    this.getAllOrder();
    this.setOrderNum();
  }

  openOrderInfo() {
    
  }

  onBankSelected(event) {
    console.log("onBankSelected", event)
    this.form.bank_account_id = parseInt(event);
  }

  setBankAccount() {
    this.bankAcc = JSON.parse(localStorage.getItem('masterData')).bank_account;
  }

  previewShipperTransferImage(file: FileList): void {
    this.form.shipper_transfer_slip_Image = file.item(0)
    console.log("[fileUpload] ",this.form.shipper_transfer_slip_Image);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrlTransfer = event.target.result
    }
    reader.readAsDataURL(this.form.shipper_transfer_slip_Image)
  }

  getProfile() {
    let id = JSON.parse(localStorage.getItem('deliver')).profile_id
    this.deliverService.getDeliverByProfileId(id)
    .subscribe(
      response => {
        console.log("[response] ",response)
        this.deliver_profile = response.data[0]
        this.form.bank_account_id = response.data[0].bank_account.bank_account_id;
        this.form.bank_account_no = response.data[0].bank_account_no;
        this.form.profile_status_id = response.data[0].profile_status.profile_status_id;

        this.bankAcc.forEach((element, idx) => {
          if (element.bank_account_id == this.form.bank_account_id) {
            this.dafault_bank = idx + 1;
            this.form.selected_bank = idx + 1;
          }    
        });


      },
      error => {
        console.log("[response] ",error)

      }
    )
  }

  openProfile() {
    console.log("[Deliver profile]")
  }

  onUpdateProfile() {
    console.log("[Update]")
    let id = this.deliver_profile.shipper_id;
    let form = {
      bank_account_id:this.form.bank_account_id,
      bank_account_no:this.form.bank_account_no,
      shipper_transfer_slip_Image:this.form.shipper_transfer_slip_Image,
      // profile_status_id:this.form.profile_status_id
    }
    this.deliverService.updateDeliver(form,id)
    .subscribe(response => {
      console.log("[Response] ",response)
    },
    error => {
      console.log("[Error] ",error)

    })
  }

  getAllOrder() {
    this.orderService.getOrders()
    .subscribe(response => {
      console.log("[Response] ",response.data)
      this.orders = response.data

    },error => {
      console.log("[Error] ",error)
    })
  }

  gotoShop(seller) {
    console.log("[Go to shop] ",seller)
    localStorage.setItem('seller_order_id',seller.seller_id)
    this.router.navigateByUrl('/deliver-order')

  }

  openAcceptOrder() {
    this.router.navigateByUrl('/order')
  }

  getOrderByDeliverId() {
    let id = JSON.parse(localStorage.getItem('deliver')).shipper_id
    this.deliverService.getOrderByDeliverId(id).subscribe(response => {
    console.log("[response] ",response)
    },error => {
      console.log("[error] ",error)

    })
  }

  setOrderNum(){

    let id = JSON.parse(localStorage.getItem('deliver')).shipper_id
    this.deliverService.getOrderByDeliverId(id)
    .subscribe(response => {
      console.log("[response] ", response)
      this.orders_num = response.data.length
      this.isShow = !this.isShow

      , error => {
        console.log('error',error);
      }
    })
  }


  searchShop() {
    console.log("[Key word] ",this.keyWord);
    this.isShow = !this.isShow
    this.orders = [];
    this.orderService.searchSellerHaveOrders(this.keyWord)
    .subscribe(response => {
      console.log("[response] searchShop",response.data);
      this.orders = response.data
      this.isShow = !this.isShow


    },error => {
      console.log("[error] searchShop",error);

    })
  }

}
