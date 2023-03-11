import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router:Router) {
  }
  public goToTemplateURL(url: string) {
    this.router.navigateByUrl(`/template/${url}`).then(r => console.log(r));
  }
}
