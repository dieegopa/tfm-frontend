import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationRoutingModule} from './navigation-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from "../../components/home/home.component";
import {LoginComponent} from "../../components/login/login.component";
import {MainComponent} from "../../components/main/main.component";
import {RegisterComponent} from "../../components/register/register.component";

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class NavigationModule {
}
