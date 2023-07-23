import { Component } from '@angular/core';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'dashboard-admin-frontend';
  constructor(ngbConfig: NgbConfig) {
    ngbConfig.animation = false;
  }
}
