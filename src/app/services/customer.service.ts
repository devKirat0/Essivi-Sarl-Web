import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment.prod";
import {Customer} from "../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient:HttpClient,private authenticationService:AuthenticationService) { }

  public getAllCustomers():Observable<Array<Customer>>{

    return this.httpClient.get<Array<Customer>>(`${environment.backendHost}/customers/`,{
      headers:{
        'Authorization':`${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    });
  }
}
