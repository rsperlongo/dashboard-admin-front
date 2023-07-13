import { DashboardComponent } from './../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [],
    providers: [],
})
export class LoginRoutingModule {}