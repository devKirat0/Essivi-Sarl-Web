import {Component} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'essiviSarl';
  templateRouteList: string[] = [
    '/template/clients',
    '/template/listeDesCommercials',
    '/template/statistics',
  ];
  constructor(private router:Router) {}

  ngOnInit(){
    this.router.events.subscribe(
      (value)=>{
        if (value instanceof NavigationStart) {
          for (const element of this.templateRouteList) {
            if(value.url == element && value.navigationTrigger == 'popstate'){
              this.router.navigateByUrl('').then(r => console.log(r));
            }
          }
        }
      }
    )
  }

}
