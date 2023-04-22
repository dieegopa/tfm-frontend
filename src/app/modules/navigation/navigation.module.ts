import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationRoutingModule} from './navigation-routing.module';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from "../../pages/home/home.component";
import {LoginComponent} from "../../pages/login/login.component";
import {MainComponent} from "../../pages/main/main.component";
import {RegisterComponent} from "../../pages/register/register.component";

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
  ],
})
export class NavigationModule {
}
