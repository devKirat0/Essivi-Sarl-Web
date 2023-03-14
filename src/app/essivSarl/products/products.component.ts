import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Subject} from "rxjs";
import {ProductModel} from "../../models/product.model";
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {CategoryModel} from "../../models/category.model";
import {ToastrService} from "ngx-toastr";

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
  constructor(private toastr:ToastrService,private productService:ProductService,private authenticationService:AuthenticationService,private fb:FormBuilder,public categoryService:CategoryService) {
  }
  async ngOnInit(){
    this.updateFormGroup = this.fb.group({
      idProduct:null,
      labelOfProduct: null,
      unitPrice: null,
      productQuantity: null,
      category_id:null,
      label:null,
      addproductQuantity:null,
    });

    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    await this.getAndReload();
    jQuery.noConflict();
    this.dtTrigger.next(null);
    //console.log(this.categories.find(r=>r.id==2));
  }

  updateProduct() {
    //console.log(this.updateFormGroup.value)
    let product:ProductModel = {
      idProduct: this.updateFormGroup.value.idProduct,
      labelOfProduct: this.updateFormGroup.value.labelOfProduct,
      unitPrice: this.updateFormGroup.value.unitPrice,
      productQuantity: this.updateFormGroup.value.productQuantity,
      category_id: this.updateFormGroup.value.category_id,
      label: this.updateFormGroup.value.label
    };
    console.log(product)
    this.productService.updateProduct(product).subscribe({
      next:async (value) => {
        this.toastr.success('Mise à jour effectuée avec succès');
        await  this.getAndReload();
        $('#exampleModalLong').modal('hide');
      },
      error:(error)=>{
        this.toastr.error('Erreur lors de la mise à jour');
      }
    })
  }

  setUpdateForm(product: any) {
    this.updateFormGroup.patchValue({
      idProduct:product.idProduct,
      labelOfProduct: product.labelOfProduct,
      unitPrice: product.unitPrice,
      productQuantity: product.productQuantity,
      category_id:product.category_id,
      label:product.label,
      addproductQuantity:null
    })
  }
  resetFormCreate(){
    this.updateFormGroup.patchValue({
      idProduct:null,
      labelOfProduct: null,
      unitPrice: null,
      productQuantity: null,
      category_id:null,
      label:null
    })
  }
  setLabel() {
    this.updateFormGroup.value.label = this.categories.find(r=>r.id==this.updateFormGroup.value.category_id)!.labelOfCat;
  }

  createProduct() {
    console.log(this.updateFormGroup.value);
    let product:ProductModel = {
      idProduct: this.updateFormGroup.value.idProduct,
      labelOfProduct: this.updateFormGroup.value.labelOfProduct,
      unitPrice: this.updateFormGroup.value.unitPrice,
      productQuantity: this.updateFormGroup.value.productQuantity + this.updateFormGroup.value.addproductQuantity,
      category_id: this.updateFormGroup.value.category_id,
      label: this.updateFormGroup.value.label
    };
    this.productService.createProduct(product).subscribe({
      next: async (value) => {
        this.toastr.success('Ajout effectuée avec succès');
        await this.getAndReload();
        $('#exampleModalLong2').modal('hide');
      },
      error: (err)=>{
        this.toastr.error('Erreur lors de l\'ajout');
      }
    });
  }

  addQuantity() {
    let product:ProductModel = {
      idProduct: this.updateFormGroup.value.idProduct,
      labelOfProduct: this.updateFormGroup.value.labelOfProduct,
      unitPrice: this.updateFormGroup.value.unitPrice,
      productQuantity: this.updateFormGroup.value.productQuantity + this.updateFormGroup.value.addproductQuantity,
      category_id: this.updateFormGroup.value.category_id,
      label: this.updateFormGroup.value.label
    };
    console.log(product);
    this.productService.updateProduct(product).subscribe({
      next:async (value) => {
        this.toastr.success('Ajout effectuée avec succès');
        await this.getAndReload();
        $('#addQuantity').modal('hide');
      },
      error:(error)=>{
        this.toastr.error('Erreur lors de l\'ajout');
      }
    })
  }
  public async getAndReload() {
    this.categories = await this.categoryService.getAllCategory()
    console.log(this.categories)
    this.products = (await this.productService.getAllProduct()).sort((a, b) => {
      const lastNameComparison = a.labelOfProduct.localeCompare(b.labelOfProduct);
      if (lastNameComparison !== 0) {
        return lastNameComparison;
      }
      return a.labelOfProduct.localeCompare(b.labelOfProduct);
    });
    this.products.forEach(value => {
      value.label = this.categories.find(r => r.id == value.category_id)!.labelOfCat;
    });
  }
}
