import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../data/services/notification.service";
import {UniversityService} from "../../data/services/university.service";
import {Subject} from "../../shared/models/subject.model";
import {Category} from "../../shared/models/category.enum";
import {FileService} from "../../data/services/file.service";
import {UserService} from "../../data/services/user.service";
import {Storage} from "@angular/fire/storage";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './edit-file-dialog.component.html',
  styleUrls: ['./edit-file-dialog.component.scss']
})
export class EditFileDialogComponent implements OnInit {

  universityControl = new FormControl('', [Validators.required]);
  degreeControl = new FormControl('', [Validators.required]);
  subjectControl = new FormControl('', [Validators.required]);
  subjects: Subject[] | undefined;
  filteredOptions: Observable<Subject[]> | undefined;
  @ViewChild("fileDropRef", {static: false}) fileDropEl: ElementRef | undefined;
  files: any[] = [];
  formUpload: FormGroup;
  categories: any[] = [];
  backendCategories: any[] = [];
  uploaded: boolean = false;
  fileName = '';
  fileCategories: any;
  fileExtras = '';
  fileNameControl = new FormControl('', [Validators.required]);
  fileCategoryControl = new FormControl('', [Validators.required]);
  fileExtrasControl = new FormControl('');
  @ViewChild("fileName") fileNameElem: ElementRef | undefined;
  file: any;

  constructor(
    private dialogRef: MatDialogRef<EditFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private universityService: UniversityService,
    private fileService: FileService,
    private userService: UserService,
    private storage: Storage,
    private toastService: HotToastService,
  ) {
    this.formUpload = new FormGroup({
      fileName: this.fileNameControl,
      fileCategory: this.fileCategoryControl,
      fileExtra: this.fileExtrasControl,
    })
    this.file = this.data.file;
    this.fileName = this.file.name;
    this.fileExtras = this.file.extra;

    Object.keys(Category).forEach(key => {
      const index = Object.keys(Category).indexOf(key)
      const category = Object.values(Category)[index];
      this.categories.push({name: category, value: index})
    });

    Object.keys(Category).forEach((index, key) => {
      this.backendCategories.push({name: index, value: key})
    });

    this.fileCategories = this.backendCategories.find((category) => category.name.toLowerCase() === this.file.category.toLowerCase())?.value;
  }

  ngOnInit(): void {
  }


  onSubmit() {

    if (this.fileName !== '' && this.fileCategories !== undefined) {
      let category = this.backendCategories.find((category) => category.value === this.fileCategories)?.name.toLowerCase();

      const formData = new FormData();
      formData.append('fileName', this.fileName);
      formData.append('fileCategory', category);
      formData.append('fileExtra', this.fileExtras);

      this.fileService.updateFile(this.file.id, this.fileName, category, this.fileExtras).subscribe(
        data => {
          this.notificationService.showSuccesNotification('Archivo editado con exito');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      );

      this.dialogRef.close();

    } else {
      this.notificationService.showErrorNotification('Debes rellenar todos los campos obligatorios');
    }
  }

}
