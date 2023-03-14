import { Component } from '@angular/core';
import {Subject} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CategoryModel} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private fb:FormBuilder,private authenticationService:AuthenticationService,private router:Router,private toastr:ToastrService,private categoryService:CategoryService) {
  }
  updateFormGroup!: FormGroup;
  userInfoLabel = this.authenticationService.getSessionStorage().label;
  categories: CategoryModel[] = [];
  dtOptions: DataTables.Settings ={};
  dtTrigger: Subject<any> = new Subject<any>();

  async ngOnInit(){
    this.updateFormGroup = this.fb.group({
      id:null,
      labelOfCat:null
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    await this.getAndReload();
    jQuery.noConflict();
    this.dtTrigger.next(null);
  }

  updateCategory() {
    console.log(this.updateFormGroup.value);
    let category:CategoryModel ={
      id:this.updateFormGroup.value.id,
      labelOfCat:this.updateFormGroup.value.labelOfCat
    }
    this.categoryService.updateCategory(category).subscribe({
      next:async (value) => {
        this.toastr.success('Mise à jour effectuée avec succès');
        await this.getAndReload();
        $('#exampleModalLong').modal('hide');
      },
      error:(error)=>{
        this.toastr.error('Erreur lors de la mise à jour');
      }
    })
  }

  createCategory() {
    let category:CategoryModel ={
      id:this.updateFormGroup.value.id,
      labelOfCat:this.updateFormGroup.value.labelOfCat
    }
    this.categoryService.createCategory(category).subscribe({
      next:async (value) => {
        this.toastr.success('Ajout effectuée avec succès');
        await this.getAndReload();
        $('#exampleModalLong2').modal('hide');
      },
      error:(error)=>{
        this.toastr.error('Erreur lors de l\'ajout');
      }
    })
  }

  setUpdateForm(category: CategoryModel) {
    this.updateFormGroup.patchValue({
      id:category.id,
      labelOfCat:category.labelOfCat
    })
  }

  resetFormCreate() {
    this.updateFormGroup.patchValue({
      id:null,
      labelOfCat:null
    });
  }

  private async getAndReload() {
    this.categories = (await this.categoryService.getAllCategory()).sort((a, b) => {
      const lastNameComparison = a.labelOfCat.localeCompare(b.labelOfCat);
      if (lastNameComparison !== 0) {
        return lastNameComparison;
      }
      return a.labelOfCat.localeCompare(b.labelOfCat);
    });
  }
}
