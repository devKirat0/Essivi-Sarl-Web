import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductModel} from "../models/product.model";
import {environment} from "../../environments/environment.prod";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient,private authenticationService:AuthenticationService) { }

  public async getAllProduct(){
    let values:ProductModel[]=[];
    await this.http.get<ProductModel[]>(`${environment.backendHost}/products`, {
      headers: {
        'Authorization': `${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    }).forEach((value) => {
      //console.log(value)
      values = value;
    });
    //console.log(values)
    return values;
  }

  public updateProduct(product:ProductModel){
    return this.http.put(`${environment.backendHost}/products/{id}?idProduct=${product.idProduct}`,{
      idProduct:product.idProduct,
      labelOfProduct:product.labelOfProduct,
      unitPrice: product.unitPrice,
      productQuantity: product.productQuantity,
      category_id: product.category_id
    },{
      headers: {
        'Authorization': `${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    });
  }

  public createProduct(product:ProductModel){
    return this.http.post(`${environment.backendHost}/products/`,{
      labelOfProduct:product.labelOfProduct,
      unitPrice: product.unitPrice,
      productQuantity: product.productQuantity,
      category_id: product.category_id
    },{
      headers:{
        'Authorization': `${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    })
  }
}
