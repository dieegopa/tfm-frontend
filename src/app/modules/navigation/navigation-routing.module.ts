import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../../components/home/home.component";
import {RegisterComponent} from "../../components/register/register.component";
import {LoginComponent} from "../../components/login/login.component";
import {MainComponent} from "../../components/main/main.component";
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {UniversityComponent} from "../../components/university/university.component";
import {UniversityDetailsComponent} from "../../components/university/university-details/university-details.component";
import {DegreeComponent} from "../../components/degree/degree.component";
import {SubjectComponent} from "../../components/subject/subject.component";
import {FileComponent} from "../../components/file/file.component";
import {GeneralComponent} from "../../components/general/general.component";
import {ResetPasswordComponent} from "../../components/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    ...canActivate(() => redirectLoggedInTo(['/main']))
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(() => redirectLoggedInTo(['/main']))
  },
  {
    path: 'main',
    component: MainComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'university',
    component: UniversityComponent,
  },
  {
    path: 'university/:slug',
    component: UniversityDetailsComponent,
  },
  {
    path: ':university/:degree',
    component: DegreeComponent,
  },
  {
    path: ':university/degree/:degree/subject/:subject',
    component: SubjectComponent,
  },
  {
    path: 'file/details/:id',
    component: FileComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'general',
    component: GeneralComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'reset_password',
    component: ResetPasswordComponent,
    ...canActivate(() => redirectLoggedInTo(['/main']))
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigationRoutingModule {
}
