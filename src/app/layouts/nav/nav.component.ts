import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  login!: string;
  constructor(private authenticationService:AuthenticationService,private router:Router,private toastr: ToastrService) {
  }
  ngOnInit(){
    this.login = this.authenticationService.getSessionStorage().user_login!;
  }
  logout() {
    this.authenticationService.removeSession();
  }
}
