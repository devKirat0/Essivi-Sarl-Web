import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {UserLoginInfo} from "../models/userLoginInfo";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  public login(username:string,password:string):Observable<UserLoginInfo>{
    const params = new HttpParams()
      .set('username',username)
      .set('password',password);
    return this.http.post<UserLoginInfo>(`${environment.backendHost}/login`,params,{
      headers:{
        "accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }

  public setSessionStorage(value:UserLoginInfo):void{
    sessionStorage.setItem('user_id',String(value.user_id));
    sessionStorage.setItem('access_token',String(value.access_token));
    sessionStorage.setItem('token_type',String(value.token_type));
    sessionStorage.setItem('user_login',String(value.user_login));
    sessionStorage.setItem('label',String(value.label));
    sessionStorage.setItem('role_id',String(value.role_id));
    sessionStorage.setItem('is_active',String(value.is_active));
  }

  public getSessionStorage(){
    return {
      user_id : parseInt(sessionStorage.getItem('user_id')!),
      access_token : sessionStorage.getItem('access_token'),
      token_type : sessionStorage.getItem('token_type'),
      user_login : sessionStorage.getItem('user_login'),
      label : sessionStorage.getItem('label'),
      role_id : parseInt(sessionStorage.getItem('role_id')!),
      is_active : parseInt(sessionStorage.getItem('is_active')!)
    }
  }
  public checkIfUserHasAccessToTemplate(checkConnectObject:any,toastr:ToastrService){
    //console.log(checkConnectObject.user_id);
    if(Number.isNaN(checkConnectObject.user_id)){
      toastr.warning(`Vous n'avez pas accès à cette partie ou votre session a été déconnectée.`)
      return false;
    }
    return true;
  }

  public startTokenExpiration(token:string,router:Router,toastr:ToastrService){
    // @ts-ignore
    let decode_jwt_exp_date = jwt_decode.default(token)['exp'];
    let date = new Date(parseInt(decode_jwt_exp_date)*1000);
    console.log(date)
    const a = setInterval(() => {
      //console.log(`Test check Value : ${this.checkIfUserHasAccessToTemplate(this.getSessionStorage(),toastr)}`)
      if(!this.checkIfUserHasAccessToTemplate(this.getSessionStorage(),toastr)){
        console.log('check')
        router.navigateByUrl('').then(r=>console.log(r));
        clearInterval(a);
      }else {
        const currentDate = new Date();
        if (currentDate > date) {
          console.log('EXPIRED TOKEN!');
          this.removeSession();
          toastr.warning('Session Expirée');
          router.navigateByUrl('').then(r => console.log(r));
          clearInterval(a);
        }
      }
    }, 5000);
  }

  public removeSession() {
    sessionStorage.clear();
  }
}
