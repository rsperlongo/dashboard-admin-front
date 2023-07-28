import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { LoginRoutingModule } from '../login/login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';



@NgModule({
  declarations: [
    RegisterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class RegisterModule { }
