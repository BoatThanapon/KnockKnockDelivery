import { Component, ViewChild, OnInit, ElementRef, Renderer2,ViewEncapsulation } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css'],
  encapsulation: ViewEncapsulation.None,


})
export class ScannerComponent implements OnInit {
  // public angularxQrCode: string = null;
  // constructor () {
  //     // assign a value
  //     this.myAngularxQrCode = 'Your QR code data string';
  // }
  elementType = 'url';
  value = 'https://assets.econsultancy.com/images/resized/0002/4236/qr_code-blog-third.png';

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;
  @ViewChild('result') resultElement: ElementRef;
  
  showQRCode: boolean = true;
  constructor(private renderer: Renderer2) {

  }
  ngOnInit() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
        console.log(devices);
        const videoDevices: MediaDeviceInfo[] = [];
        for (const device of devices) {
            if (device.kind.toString() === 'videoinput') {
                videoDevices.push(device);
            }
        }
        if (videoDevices.length > 0){
            let choosenDev;
            for (const dev of videoDevices){
                if (dev.label.includes('front')){
                    choosenDev = dev;
                    break;
                }
            }
            if (choosenDev) {
                this.qrScannerComponent.chooseCamera.next(choosenDev);
            } else {
                this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
            }
        }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
    });

  }

  render(e) {
    console.log(e.result);
    let element: Element = this.renderer.createElement('p');
    element.innerHTML = e.result;
    this.renderElement(element);
  }

  renderElement(element) {
    for (let node of this.resultElement.nativeElement.childNodes) {
      this.renderer.removeChild(this.resultElement.nativeElement, node);
    }
    this.renderer.appendChild(this.resultElement.nativeElement, element);
  }
}
