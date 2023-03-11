import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {NumberOfPersonPerLabelModel} from "../models/numberOfPersonPerLabel.model";
import {QuantityPerCategoryModel} from "../models/quantityPerCategory.model";
import {CaPerMonthModel} from "../models/caPerMonth.model";
import {UserService} from "./user.service";
import {AuthenticationService} from "./authentication.service";
import {CaOfCategoryPerMonth} from "../models/caOfCategoryPerMonth";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http:HttpClient,private authenticationService:AuthenticationService) { }

  public numberOfPersonPerLabel(){
    return this.http.get<NumberOfPersonPerLabelModel[]>(`${environment.backendHost}/reports/user_type/`,{
      headers:{
        'Authorization':`${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    }).toPromise().then((data)=>{
      return data;
    })
  }
  public quantityPerCategory(){
    return this.http.get<QuantityPerCategoryModel[]>(`${environment.backendHost}/reports/quantityPerCat/`,{
      headers:{
        'Authorization':`${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    }).toPromise().then((data)=>{
      return data;
    })
  }
  public caPerMonth(){
    return this.http.get<CaPerMonthModel[]>(`${environment.backendHost}/reports/caPerMonth/`,{
      headers:{
        'Authorization':`${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    }).toPromise().then((data)=>{
      return data;
    });
  }

  public caOfCategoryPerMonth(){
    return this.http.get<CaOfCategoryPerMonth[]>(`${environment.backendHost}/reports/caOfCatPerMonth/`,{
      headers:{
        'Authorization':`${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    }).toPromise().then((data)=>{
      return data;
    });
  }

}
