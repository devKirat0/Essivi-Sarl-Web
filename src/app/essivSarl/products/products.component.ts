import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Subject} from "rxjs";
import {ProductModel} from "../../models/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  updateFormGroup: any;
  userInfoLabel!: string;
  products!: ProductModel[];
  dtOptions: DataTables.Settings ={};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public productService:ProductService) {
  }
  async ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    this.products = await this.productService.getAllProduct();
    jQuery.noConflict();
    this.dtTrigger.next(null);
  }

  updateUser() {

  }

  setUpdateForm(commercial: any) {

  }
}
