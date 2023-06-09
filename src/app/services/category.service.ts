import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {CategoryModel} from "../models/category.model";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient,private authenticationService:AuthenticationService) { }

  public async getAllCategory(){
    let values: CategoryModel[] = [];
    await this.http.get<CategoryModel[]>(`${environment.backendHost}/catgories`,{
      headers:{
        'Authorization': `${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    })
      .forEach((value) => {
        values = value;
      })
    return values;
  }

  public async getOnCategoryByTheId(id:number){
    let valueCat: CategoryModel = {
      id:0,
      labelOfCat: ''
    };
    await this.http.get<CategoryModel>(`${environment.backendHost}/catgories/${id}`,{
      headers:{
        'Authorization': `${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    })
      .forEach((value) => {
        valueCat = value;
      })
    return valueCat;
  }

  public updateCategory(category:CategoryModel){
    console.log(category.id);
    return this.http.put(`${environment.backendHost}/catgories/${category.id}`,{
      id:category.id,
      labelOfCat:category.labelOfCat
    },{
      headers: {
        'Authorization': `${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    });
  }public createCategory(category:CategoryModel){
    return this.http.post(`${environment.backendHost}/catgories/`,{
      id:0,
      labelOfCat:category.labelOfCat
    },{
      headers: {
        'Authorization': `${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    });
  }
}
