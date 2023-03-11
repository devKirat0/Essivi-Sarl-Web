import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {TemplateModule} from "./template/template.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { HomeComponent } from './essivSarl/home/home.component';
import { ListCommercialComponent } from './essivSarl/list-commercial/list-commercial.component';
import {DataTablesModule} from "angular-datatables";
import {NgChartsModule} from "ng2-charts";
import { StatisticsComponent } from './essivSarl/statistics/statistics.component';
import { ProductsComponent } from './essivSarl/products/products.component';
import { CategoriesComponent } from './essivSarl/categories/categories.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListCommercialComponent,
    StatisticsComponent,
    ProductsComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    AuthenticationModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        progressBar: true
      }
    ),
    DataTablesModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
