import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../data/services/notification.service";
import {UniversityService} from "../../data/services/university.service";
import {University} from "../../shared/models/university.model";
import {MatSelectChange} from "@angular/material/select";
import {Degree} from "../../shared/models/degree.model";
import {Subject} from "../../shared/models/subject.model";
import {Category} from "../../shared/models/category.enum";
import {FileService} from "../../data/services/file.service";
import {UserService} from "../../data/services/user.service";
import {getDownloadURL, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";
import * as uuid from 'uuid';
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent implements OnInit {

  universityControl = new FormControl('', [Validators.required]);
  degreeControl = new FormControl('', [Validators.required]);
  subjectControl = new FormControl('', [Validators.required]);
  subjects: Subject[] | undefined;
  filteredOptions: Observable<Subject[]> | undefined;
  @ViewChild("fileDropRef", {static: false}) fileDropEl: ElementRef | undefined;
  files: any[] = [];
  formUpload: FormGroup;
  universityForm: string = '';
  degreeForm: string = '';
  subjectForm: string = '';
  universities: University[] | null = [];
  degrees: Degree[] | undefined = [];
  categories: any[] = [];
  backendCategories: any[] = [];
  uploaded: boolean = false;
  fileNames = ['fileName0'];
  fileCategories = [''];
  fileExtras = [''];
  fileNameControls = [new FormControl('', [Validators.required])];
  fileCategoryControls = [new FormControl('', [Validators.required])];
  fileExtrasControls = [new FormControl('')];
  @ViewChild("fileName") fileNameElem: ElementRef | undefined;
  dataIncoming: any;

  constructor(
    private dialogRef: MatDialogRef<UploadFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private universityService: UniversityService,
    private fileService: FileService,
    private userService: UserService,
    private storage: Storage,
    private toastService: HotToastService,
  ) {
    this.formUpload = new FormGroup({
      degree: this.degreeControl,
      subject: this.subjectControl,
      fileName0: this.fileNameControls[0],
      fileCategory0: this.fileCategoryControls[0],
      fileExtra0: this.fileExtrasControls[0],
    })
    this.setDataOptions(this.data);

    Object.keys(Category).forEach(key => {
      const index = Object.keys(Category).indexOf(key)
      const category = Object.values(Category)[index];
      this.categories.push({name: category, value: index})
    });

    Object.keys(Category).forEach((index, key) => {
      this.backendCategories.push({name: index, value: key})
    });
  }

  ngOnInit(): void {
  }

  private _filter(value: number): Subject[] {
    const filterValue = value;
    return this.subjects?.filter(option => option.name.toLowerCase().indexOf(String(filterValue)) === 0) || [];
  }

  /**
   * on file drop handler
   */
  onFileDropped($event: FileList) {
    this.prepareFilesList($event as FileList);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    this.prepareFilesList(target.files as FileList);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        this.uploaded = true;
        return;
      } else {
        this.uploaded = false;
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: FileList) {
    // @ts-ignore
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      if (this.files.length > 1) {
        this.fileNames.push(item.name);
        this.fileNameControls.push(new FormControl('', [Validators.required]));
        this.formUpload.addControl('fileName' + (this.files.length - 1), this.fileNameControls[this.files.length - 1]);

        this.fileCategories.push('');
        this.fileCategoryControls.push(new FormControl('', [Validators.required]));
        this.formUpload.addControl('fileCategory' + (this.files.length - 1), this.fileCategoryControls[this.files.length - 1]);

        this.fileExtras.push('');
        this.fileExtrasControls.push(new FormControl(''));
        this.formUpload.addControl('fileExtra' + (this.files.length - 1), this.fileExtrasControls[this.files.length - 1]);

      } else {
        this.fileNames[0] = item.name;
      }
    }
    // @ts-ignore
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals = 2) {

    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }


  onSubmit() {

    if (this.universityForm !== ''
      && this.degreeForm !== ''
      && this.subjectForm !== ''
      && this.files.length > 0
      && this.uploaded
      && this.fileNames.length > 0
      && this.fileCategories.length > 0) {

      for (let i = 0; i < this.fileCategories.length; i++) {
        if (this.fileCategories[i] === '') {
          this.notificationService.showErrorNotification('Debes rellenar todos los campos');
          return;
        }
      }

      const formData = new FormData();

      let categories: any[] = [];
      this.fileCategories.map(category => {
        categories.push(this.backendCategories.find(item => item.value === category).name.toLowerCase());
      })

      this.files.map((file, index) => {

        const extension = file.type.split('/')[1];

        const myId = uuid.v4();
        //let fileName = Date.now() + '_' + this.fileNames[index] + '_' + this.userService.getUserSub() + '_' + myId;
        let fileName = Date.now() + '_' + myId + '.' + extension

        formData.append('fileName', this.fileNames[index]);
        formData.append('fileCategory', categories[index]);
        formData.append('uniqueName', fileName);
        formData.append('fileExtra', this.fileExtras[index]);
        formData.append('fileType', file.type);
        formData.append('subjectId', this.subjectForm);
        formData.append('userSub', this.userService.getUserSub());

        const storageRef = ref(this.storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const toastRef = this.toastService.loading(
          'Subiendo archivos',
          {
            autoClose: false
          }
        );

        uploadTask.on('state_changed',
          (snapshot) => {
          },
          () => {
          }
          ,
          () => {
            toastRef.close();
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              formData.append('fileUrl', downloadURL);
              this.fileService.uploadFile(formData).subscribe(
                data => {
                  this.notificationService.showSuccesNotification('Archivos subidos con exito');
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }
              );
            });
          }
        );
      });
      this.dialogRef.close();
    } else {
      if (!this.uploaded) {
        this.notificationService.showErrorNotification('No se han subido los archivos');
      } else {
        this.notificationService.showErrorNotification('Debes rellenar todos los campos')
      }

    }
  }

  setDataOptions(dataDialog: any) {
    this.universityService.getUniversities()
      .subscribe(data => {
        this.universities = data;
        if (this.data !== null && this.data !== undefined) {
          this.universities?.map(university => {
            if (university.id === this.data.university) {
              this.degrees = university.degrees;
              this.degrees?.map(degree => {
                if (degree.id === this.data.degree) {
                  this.subjects = degree.subject;
                  this.filteredOptions = this.subjectControl.valueChanges.pipe(
                    startWith(''),
                    map((value: any) => this._filter(value || '')),
                  );

                  this.universityForm = dataDialog.university;
                  this.degreeForm = dataDialog.degree;
                  this.subjectForm = dataDialog.subject;

                }
              })

            }
          })
        }
      });
  }

  setDegrees($event: MatSelectChange) {
    this.universities?.map(university => {
      if (university.id === $event.value) {
        this.degrees = university.degrees;
        return;
      } else {
        this.degreeForm = '';
        this.subjectForm = '';
      }
    })
  }

  setSubjects($event: MatSelectChange) {
    this.degrees?.map(degree => {
      if (degree.id === $event.value) {
        this.subjects = degree.subject;
        this.filteredOptions = this.subjectControl.valueChanges.pipe(
          startWith(''),
          map((value: any) => this._filter(value || '')),
        );
        return;
      } else {
        this.subjectForm = '';
      }
    })
  }

  displayFn(options: Subject[] | undefined): (id: number) => string {
    return (id: number) => {
      const correspondingOption = Array.isArray(options) ? options.find(option => option.id === id) : null;
      return correspondingOption ? correspondingOption.name : '';
    }
  }

}
