import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SellerService } from '../../services/seller.service';



@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  // @Input() name: String;
  private isClick:boolean = false;
  private isLoad: boolean = false;
  private isCreate: boolean = false;
  private form = {
    product_name: null,
    product_type: null,
    product_price: null,
    product_catagory: null,
    selected_catagory: null,
    product_image: null,
    product_description: null,
    unit_in_stock: null,
  }
  private dafault_catagory: Number;
  private catagory;
  private seller;
  private error = []
  private masterData;

  fileToUpload: File = null;

  context: CanvasRenderingContext2D;

  @ViewChild("mycanvas") mycanvas;


  constructor(
    private sellerService: SellerService,
  ) { }

  ngOnInit() {
    this.seller = JSON.parse(localStorage.getItem("seller"));
    this.masterData = JSON.parse(localStorage.getItem('masterData'))
    this.catagory = this.masterData.product_category;
    // this.sellerService.getShopCategories().subscribe(
    //   response => {
    //     console.log("response from catagory: ",response)
    //     this.catagory = response['data']
    //     this.isLoad = true

    //   },
    //   error => console.log("response from catagory: ",error)
    // )
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
      // img.src = event.target.result;
    };
    render.readAsDataURL(e.target.files[0]);


  }

  selectChange(id: any) {
    console.log("selectChange", id)
    // this.form.selected_catagory = this.form[$event];
  }
  
  onCatagorySelected(event) {
    console.log("onCatagorySelected", event)
    this.form.selected_catagory = parseInt(event);
  }

  onCreate() {
    console.log("onCreate")
    console.log("form: ", this.form)
    this.isClick = !this.isClick;


    var tempForm =
    {
      product_name: this.form.product_name,
      product_description: this.form.product_description,
      product_price: parseInt(this.form.product_price),
      unit_in_stock: parseInt(this.form.unit_in_stock),
      product_category_id: parseInt(this.form.selected_catagory)
    }

    console.log("tempForm: ", tempForm)


    this.sellerService.createProduct(tempForm, this.seller).subscribe(
      response =>   {
        console.log("response onCreate: ", response)
        this.isClick = !this.isClick;
        this.isCreate = !this.isCreate;
        this.onClear();
      },
      error => {
        this.isClick = !this.isClick;
        console.log("error: ", error)
      }
    )

  }

  onClear() {
    console.log("clear")
    this.form.product_name = '';
    this.form.product_type = '';
    this.form.product_price = '';
    this.form.product_catagory = '';
    this.form.product_description = '';
    this.form.product_image = '';
    this.form.selected_catagory = '';
    this.form.unit_in_stock = '';

  }








}
