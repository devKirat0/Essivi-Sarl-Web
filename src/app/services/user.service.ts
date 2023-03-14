import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient,private authenticationService:AuthenticationService) { }

  public getAllUsers():Observable<Array<User>>{

    return this.httpClient.get<Array<User>>(`${environment.backendHost}/users/`,{
      headers:{
        'Authorization':`${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    });
  }

  public async getAllCommercials(){
    let values:User[] = [];
    await this.getAllUsers().forEach((value) => {
      values = value.filter(value =>value.role_id ==2);
    });
    return values;
  }
  public updateCommercial(user:User){
    return this.httpClient.put(`${environment.backendHost}/users/account/{id}?idUser=${user.idUser}`,{
      login:user.login,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      telephone: user.telephone,
      is_active: user.is_active
    },{
      headers:{
        'Authorization':`${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    });
  }

  public createCommercial(user:User){
    return this.httpClient.post(`${environment.backendHost}/users/`,{
      login: user.login,
      passOfUser: user.passOfUser,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      telephone: user.telephone,
      role_id: user.role_id,
      is_active: user.is_active
    },{
      headers:{
        'Authorization':`${this.authenticationService.getSessionStorage().token_type} ${this.authenticationService.getSessionStorage().access_token}`
      }
    });
  }
}
