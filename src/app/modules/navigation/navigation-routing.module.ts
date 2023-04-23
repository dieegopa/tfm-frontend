import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../../components/home/home.component";
import {RegisterComponent} from "../../components/register/register.component";
import {LoginComponent} from "../../components/login/login.component";
import {MainComponent} from "../../components/main/main.component";
import {canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigationRoutingModule {
}
