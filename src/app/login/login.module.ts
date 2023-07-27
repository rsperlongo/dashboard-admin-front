import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRoutingModule } from '../register/register-routing.module';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RegisterRoutingModule,
    HttpClientModule,
    
  ],
  declarations: [
    LoginComponent
  ],
  providers: [AuthService]
})
export class LoginModule { }
