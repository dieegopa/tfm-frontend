import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {map, Observable, startWith} from "rxjs";
import {Notify} from "notiflix/build/notiflix-notify-aio";
import {ErrorAuthMessage} from "../../shared/models/errorauth.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent implements OnInit, AfterViewInit {

  degreeControl = new FormControl('', [Validators.required]);
  subjectControl = new FormControl('', [Validators.required]);
  fileNameControl = new FormControl('', [Validators.required]);
  fileCategoryControl = new FormControl('', [Validators.required]);
  options: [{ name: string; id: number }] = [{id: 1, name: 'Seguridad'}];
  filteredOptions: Observable<{ name: string; id: number; }[]> | undefined;
  dataSourceArray: any[] = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("fileDropRef", {static: false}) fileDropEl: ElementRef | undefined;
  files: any[] = [];
  formUpload: FormGroup;
  degreeForm: string = '';
  subjectForm: string = '';
  fileNameForm: string = '';
  fileCategoryForm: string = '';
  closeDialog: boolean = false;
  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private dialogRef: MatDialogRef<UploadFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formatData();
    this.formUpload = new FormGroup({
      degree: this.degreeControl,
      subject: this.subjectControl,
      fileName: this.fileNameControl,
      fileCategory: this.fileCategoryControl,
    })
    console.log(this.data)
  }

  ngOnInit(): void {
    this.filteredOptions = this.subjectControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private _filter(value: string): { name: string; id: number }[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  formatData() {
    for (let i = 0; i < 20; i++) {
      this.dataSourceArray.push({
        id: i,
        name: 'name ' + i,
      });
    }

    this.dataSource = new MatTableDataSource<any>(this.dataSourceArray);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter);
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
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
      console.log("Upload in progress.");
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
        return;
      } else {
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
    if (this.degreeForm !== '' && this.subjectForm !== '' && this.fileNameForm !== '' && this.fileCategoryForm !== '' && this.files.length > 0) {
      console.log('Formulario enviado');
      Notify.success('Archivos subidos con exito', {
        position: 'center-top',
        distance: '4px',
        success: {
          background: '#0D9488',
          notiflixIconColor: '#ffffff',
        },
      });
      this.dialogRef.close();
    } else {
      Notify.failure('Debes rellenar todos los campos', {
        position: 'center-top',
        distance: '4px',
        failure: {
          background: '#B91C1B',
          notiflixIconColor: '#ffffff',
        },
      });
    }
  }

}
