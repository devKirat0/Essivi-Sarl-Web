import { Component } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {

  label!:string;
  login!: string;
  constructor(private authenticationService:AuthenticationService,private router:Router,private toastr:ToastrService) {
  }
  ngOnInit(){
    this.authenticationService.startTokenExpiration(this.authenticationService.getSessionStorage().access_token!,this.router,this.toastr);
    this.label = this.authenticationService.getSessionStorage().label!;
    this.login = this.authenticationService.getSessionStorage().user_login!;
  }

}
