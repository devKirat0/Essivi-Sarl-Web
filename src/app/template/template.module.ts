import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import {LayoutsModule} from "../layouts/layouts.module";
import {NgChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    LayoutsModule,
    NgChartsModule
  ]
})
export class TemplateModule { }
