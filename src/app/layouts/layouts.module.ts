import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent
  ]
})
export class LayoutsModule { }
