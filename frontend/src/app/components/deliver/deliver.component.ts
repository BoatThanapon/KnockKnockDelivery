import { Component, OnInit } from '@angular/core';
import { DeliverService } from '../../services/deliver.service';


@Component({
  selector: 'app-deliver',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.css']
})
export class DeliverComponent implements OnInit {

  private deliver_profile = [];
  private isShow:boolean = true;
  private isUpdate:boolean = false;

  constructor(
    private deliverService: DeliverService,

  ) { }

  ngOnInit() {
    this.getProfile();
  }

  openOrderInfo() {
    
  }

  getProfile() {
    let id = localStorage.getItem('seller_id');
    this.deliverService.getDeliverByProfileId(id)
    .subscribe(
      response => {
        console.log("[response] ",response)
        this.deliver_profile = response.data;
        this.isShow = !this.isShow
      },
      error => {
        console.log("[response] ",error)

      }
    )
  }

  openProfile() {
    console.log("[Deliver profile]")
  }

}
