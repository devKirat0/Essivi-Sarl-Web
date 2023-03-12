import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Subject} from "rxjs";
import {ProductModel} from "../../models/product.model";
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {CategoryModel} from "../../models/category.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  updateFormGroup!: FormGroup;
  userInfoLabel = this.authenticationService.getSessionStorage().label;
  products!: ProductModel[];
  dtOptions: DataTables.Settings ={};
  dtTrigger: Subject<any> = new Subject<any>();
  categories: CategoryModel[] = [];
  constructor(private productService:ProductService,private authenticationService:AuthenticationService,private fb:FormBuilder,public categoryService:CategoryService) {
  }
  async ngOnInit(){
    this.updateFormGroup = this.fb.group({
      idProduct:null,
      labelOfProduct: null,
      unitPrice: null,
      productQuantity: null,
      category_id:null,
      label:null,
    });

    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    this.categories = await this.categoryService.getAllCategory();
    this.products = await this.productService.getAllProduct();
    this.products.forEach(value => {
      value.label = this.categories.find(r=> r.id == value.category_id)!.labelOfCat;
    });
    jQuery.noConflict();
    this.dtTrigger.next(null);
    //console.log(this.categories.find(r=>r.id==2));
  }

  updateUser() {
    console.log(this.updateFormGroup.value)
  }

  setUpdateForm(product: any) {
    this.updateFormGroup.setValue({
      idProduct:product.idProduct,
      labelOfProduct: product.labelOfProduct,
      unitPrice: product.unitPrice,
      productQuantity: product.productQuantity,
      category_id:product.category_id,
      label:product.label
    })
  }

  setLabel() {
    this.updateFormGroup.value.label = this.categories.find(r=>r.id==this.updateFormGroup.value.category_id)!.labelOfCat;
  }
}
