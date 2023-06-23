import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {SkeletonComponent} from './layout/skeleton/skeleton.component';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UniversityComponent} from './components/university/university.component';
import {MatCardModule} from "@angular/material/card";
import {UniversityDetailsComponent} from './components/university/university-details/university-details.component';
import {FooterComponent} from './layout/footer/footer.component';
import {DegreeComponent} from './components/degree/degree.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {SubjectComponent} from './components/subject/subject.component';
import {UploadFileDialogComponent} from './components/upload-file-dialog/upload-file-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DndDirective} from './dnd.directive';
import {ProgressComponent} from './components/progress/progress.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {HotToastModule} from '@ngneat/hot-toast';
import {MatTooltipModule} from "@angular/material/tooltip";
import {FileComponent} from './components/file/file.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {StarRatingModule} from "angular-star-rating";
import { GeneralComponent } from './components/general/general.component';
import {NgxDocViewerModule} from "ngx-doc-viewer";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import {EditFileDialogComponent} from "./components/edit-file-dialog/edit-file-dialog.component";
import { PoliticsComponent } from './components/politics/politics.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SkeletonComponent,
    UniversityComponent,
    UniversityDetailsComponent,
    FooterComponent,
    DegreeComponent,
    SubjectComponent,
    UploadFileDialogComponent,
    EditFileDialogComponent,
    DndDirective,
    ProgressComponent,
    FileComponent,
    GeneralComponent,
    ResetPasswordComponent,
    ProfileComponent,
    PoliticsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    FormsModule,
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    MatTooltipModule,
    PdfViewerModule,
    StarRatingModule.forRoot(),
    NgxDocViewerModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
