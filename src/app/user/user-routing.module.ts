import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full'},
  { path: 'user', redirectTo: 'user/login', pathMatch: 'full'},
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
