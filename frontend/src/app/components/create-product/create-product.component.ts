import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {


  form = {
    product_name: null,
    product_type: null,
    product_price: null,
    product_catagory: null,
    product_image: null,
    product_description:null

  }

  error = []

  fileToUpload: File = null;

  context: CanvasRenderingContext2D;

  @ViewChild("mycanvas") mycanvas;


  constructor() { }

  ngOnInit() {
  }

  onCreate() {
    console.log(this.form)

  }

  preview(e: any): void {
    let canvas = this.mycanvas.nativeElement;
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, 300, 300);

    //Show render image to canvas
    var render = new FileReader();
    render.onload = function (event) {
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0)
        // context.drawImage(img,0,0,400,400)

      }
      img.src = event.target.result;
    };
    render.readAsDataURL(e.target.files[0]);


  }

  clear() {
    console.log("clear")
    this.form.product_name = '';
    this.form.product_type = '';
    this.form.product_price = '';
    this.form.product_catagory = '';
    this.form.product_description = '';
    this.form.product_image = '';

  }








}
