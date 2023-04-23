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
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

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
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
})
export class NavigationModule {
}
