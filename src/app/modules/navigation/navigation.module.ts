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
import {MatDialogModule} from "@angular/material/dialog";
import {MatTreeModule} from "@angular/material/tree";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";

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
        MatDialogModule,
        MatTreeModule,
        MatProgressBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
    ],
})
export class NavigationModule {
}
