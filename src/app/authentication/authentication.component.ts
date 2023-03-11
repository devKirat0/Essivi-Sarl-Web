import { Component,HostListener } from '@angular/core';
import { Renderer2 } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  authenticationGroup!: FormGroup;
  private _event: any;
  constructor(private renderer:Renderer2,private fb:FormBuilder,private authenticationService:AuthenticationService,private toastr:ToastrService,private router:Router) {
  }

  ngOnInit(){
    this.renderer.addClass(document.body,'bg-gradient-primary')
    this.authenticationGroup = this.fb.group({
      username: null,
      password: null,
    });
  }
  /*@HostListener('window:popstate', ['$event'])
  onPopState(event: { preventDefault: () => void; }) {
    // Empêche la navigation arrière
    event.preventDefault();
  }*/
  public login() {
    let username = this.authenticationGroup.value.username;
    let password = this.authenticationGroup.value.password;
    if(username == null || password == null){
      this.toastr.error('Username ou Mot de passe non saisie');
    }else{
      this.authenticationService.login(username,password).subscribe((value) => {
        if(value.is_active){
          if(value.label == 'Agent'){
            this.toastr.warning(`Vous n'avez pas accès à l'application`)
          }else{
            this.authenticationService.setSessionStorage(value);
            this.toastr.success('Connexion réussie')
            this.renderer.removeClass(document.body,'bg-gradient-primary');
            this.router.navigateByUrl('/confirm').then(r => console.log(r));
          }
        }else{
          this.toastr.error('Votre compte est inactif');
        }
      }, error => {
        this.toastr.error('Username ou mot de passe incorrect');
      });
    }
  }
}
