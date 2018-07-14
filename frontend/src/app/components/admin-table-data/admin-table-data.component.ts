import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../../services/seller.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-table-data',
  templateUrl: './admin-table-data.component.html',
  styleUrls: ['./admin-table-data.component.css']
})
export class AdminTableDataComponent implements OnInit {

  @Input() products: Object;
  @Output() reloadPage = new EventEmitter();

  private baseUrl = 'http://localhost:8000';
  private headers;
  private datas;

  constructor(
    private modalService: NgbModal,
    private sellerService: SellerService,
    private adminService: AdminService,

  ) { }

  ngOnInit() {
  }

}
