import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {TemplateComponent} from "./template/template.component";
import {HomeComponent} from "./essivSarl/home/home.component";
import {ListCommercialComponent} from "./essivSarl/list-commercial/list-commercial.component";
import {StatisticsComponent} from "./essivSarl/statistics/statistics.component";
import {ProductsComponent} from "./essivSarl/products/products.component";
import {CategoriesComponent} from "./essivSarl/categories/categories.component";

const routes: Routes = [
  {
    path:"",redirectTo:"/login",pathMatch:"full"
  },
  {
    path:"login",component:AuthenticationComponent
  },
  {
    path:"confirm",redirectTo:"/template/listeDesCommercials",pathMatch:"full"
  },
  {
    path:"template",component:TemplateComponent,children:[
      {
        path:'clients',component:HomeComponent
      },
      {
        path:'listeDesCommercials',component:ListCommercialComponent
      },
      {
        path:'statistics',component:StatisticsComponent
      },
      {
        path:'produits',component:ProductsComponent
      },
      {
        path:'categories',component:CategoriesComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
