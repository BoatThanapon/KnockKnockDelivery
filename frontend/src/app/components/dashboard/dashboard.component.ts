import { Component, OnInit,ViewChild  } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // @ViewChild('gmap') gmapElement: any;
  // map: google.maps.Map;

  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  form = {
    Name: null,
    Email: null,
    Subject: null,
    Message: null
  }

  constructor() { }

  ngOnInit() {
    // var mapProp = {
    //   center: new google.maps.LatLng(43.059026, -89.295515),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  onSubmit() {
    
  }





}
