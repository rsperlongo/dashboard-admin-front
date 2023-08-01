import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { NgbTooltipModule, NgbCollapseModule  } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    NgbTooltipModule,
    NgbCollapseModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class UserModule { }
