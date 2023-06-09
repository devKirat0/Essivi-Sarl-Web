import {Component, ElementRef, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Modal} from "bootstrap";
@Component({
  selector: 'app-list-commercial',
  templateUrl: './list-commercial.component.html',
  styleUrls: ['./list-commercial.component.css']
})
export class ListCommercialComponent {
  userInfoLabel = this.authenticationService.getSessionStorage().label;
  commercials!:User[];
  dtOptions: DataTables.Settings ={};
  dtTrigger: Subject<any> = new Subject<any>();
  updateFormGroup!: FormGroup;
  constructor(private toastr:ToastrService,private userService:UserService,private authenticationService: AuthenticationService,private router:Router,private fb:FormBuilder) {
  }


  async ngOnInit() {
    this.updateFormGroup = this.fb.group({
      id:null,
      login:null,
      password:null,
      lastname:null,
      firstname:null,
      email:null,
      telephone:null,
      isActif:false,
    })
    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    this.commercials = (await this.userService.getAllCommercials()).sort((a,b)=>{
      const lastNameComparison = a.lastname.localeCompare(b.lastname);
      if(lastNameComparison!==0){
        return lastNameComparison;
      }
      return a.firstname.localeCompare(b.firstname);
    });
    console.log(this.commercials);
    jQuery.noConflict();
    console.log(this.dtTrigger);
    this.dtTrigger.next(null);
  }

  navigateToUrlOfTemplate(s: string) {
    this.router.navigateByUrl(`/template/${s}`).then(r => console.log(r))
  }

  updateUser() {
    //console.log(this.updateFormGroup.value)
    let user: User = {
      idUser:this.updateFormGroup.value.id,
      email: this.updateFormGroup.value.email,
      firstname: this.updateFormGroup.value.firstname,
      is_active: this.updateFormGroup.value.isActif,
      lastname: this.updateFormGroup.value.lastname,
      login: this.updateFormGroup.value.login,
      passOfUser: '',
      role_id: 0,
      telephone: this.updateFormGroup.value.telephone,
      customers: [],
      delivers: []
    }
    console.log(user);
    jQuery.noConflict();
    this.userService.updateCommercial(user).subscribe({
      next: async (value) => {
        this.toastr.success(`Mise à jour effectuée avec succès`);
        $('#exampleModalLong').modal('hide');
        this.commercials = (await this.userService.getAllCommercials()).sort((a,b)=>{
          const lastNameComparison = a.lastname.localeCompare(b.lastname);
          if(lastNameComparison!==0){
            return lastNameComparison;
          }
          return a.firstname.localeCompare(b.firstname);
        });
      },
      error: (values) =>{
        this.toastr.error(`Erreur lors de la modification`)
      }
    });
  }

  setUpdateForm(commercial: User) {
    this.updateFormGroup.patchValue({
      id: commercial.idUser,
      login: commercial.login,
      password: commercial.passOfUser,
      lastname: commercial.lastname,
      firstname: commercial.firstname,
      email: commercial.email,
      telephone: commercial.telephone,
      isActif: commercial.is_active,
    })

  }
  ngOnDestroy() {
    console.log('Bye');
  }

  createUser() {
    let user: User = {
      idUser:this.updateFormGroup.value.id,
      email: this.updateFormGroup.value.email,
      firstname: this.updateFormGroup.value.firstname,
      is_active: this.updateFormGroup.value.isActif,
      lastname: this.updateFormGroup.value.lastname,
      login: this.updateFormGroup.value.login,
      passOfUser: this.updateFormGroup.value.password,
      role_id: 2,
      telephone: this.updateFormGroup.value.telephone,
      customers: [],
      delivers: []
    }
    console.log(user);
    this.userService.createCommercial(user).subscribe({
      next:async (value) => {
        this.toastr.success(`Commercial créé avec succès`);
        $('#exampleModalLong2').modal('hide');
        this.commercials = (await this.userService.getAllCommercials()).sort((a,b)=>{
          const lastNameComparison = a.lastname.localeCompare(b.lastname);
          if(lastNameComparison!==0){
            return lastNameComparison;
          }
          return a.firstname.localeCompare(b.firstname);
        });
      },
      error:(error)=>{
        this.toastr.error(`Erreur lors de la création`)
      }
    });
  }

  resetForm() {
    this.updateFormGroup.patchValue({
      id: null,
      login: null,
      password: null,
      lastname: null,
      firstname: null,
      email: null,
      telephone: null,
      isActif: false,
    })
  }

  activeCommercial(commercial: User) {
    commercial.is_active = true;
    this.userService.updateCommercial(commercial).subscribe({
      next: async (value) => {
        this.toastr.success(`Commercial activé`);
        this.commercials = (await this.userService.getAllCommercials()).sort((a,b)=>{
          const lastNameComparison = a.lastname.localeCompare(b.lastname);
          if(lastNameComparison!==0){
            return lastNameComparison;
          }
          return a.firstname.localeCompare(b.firstname);
        });
      },
      error: (values) =>{
        this.toastr.error(`Erreur lors de l'activation du commercial`);
      }
    });
  }

  deactiveCommercial(commercial: User) {
    commercial.is_active=false;
    this.userService.updateCommercial(commercial).subscribe({
      next: async (value) => {
        this.toastr.success(`Commercial désactivé`);
        this.commercials = (await this.userService.getAllCommercials()).sort((a,b)=>{
          const lastNameComparison = a.lastname.localeCompare(b.lastname);
          if(lastNameComparison!==0){
            return lastNameComparison;
          }
          return a.firstname.localeCompare(b.firstname);
        });
      },
      error: (values) =>{
        this.toastr.error(`Erreur lors de la désactivation du commercial`);
      }
    });
  }
}
