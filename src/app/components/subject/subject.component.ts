import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {University} from "../../shared/models/university.model";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../data/services/user.service";
import {Subject} from "../../shared/models/subject.model";
import {File} from "../../shared/models/file.model";
import {UploadFileDialogComponent} from "../upload-file-dialog/upload-file-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SubjectService} from "../../data/services/subject.service";
import {Category} from "../../shared/models/category.enum";
import {Location} from "@angular/common";
import {Degree} from "../../shared/models/degree.model";
import {Report} from "notiflix";
import {environment} from "../../../environments/environment";
import {NotificationService} from "../../data/services/notification.service";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'user', 'extra', 'actions'];
  dataSourceArray: any[] = [];
  dataSource = new MatTableDataSource<any>();
  universitySlug: string | undefined;
  degreeSlug: string | undefined;
  subjectSlug: string | undefined;
  subject: Subject | null | undefined;
  university: University | null | undefined;
  files: File[] | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  degree: Degree | null | undefined;
  @ViewChild('input') input: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private subjectService: SubjectService,
    private location: Location,
    private notificationService: NotificationService,
    private clipboard: Clipboard,
  ) {
    this.route.url.subscribe((url) => {
      this.universitySlug = url[0].path;
      this.degreeSlug = url[2].path;
      this.subjectSlug = url[4].path;
    });

    this.setData();

  }

  ngOnInit(): void {
  }

  return() {
    this.location.back();
  }

  applyFilter(event: Event | null) {
    if (event != null) {
      const filterValue = (event.target as HTMLInputElement).value;

      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.name.toLowerCase().includes(filter) || data.category.toLowerCase().includes(filter) || data.user.toLowerCase().includes(filter);
      }

      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }

  download(url: string, $event: MouseEvent) {
    $event.stopPropagation();
    if (!this.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      const a = document.createElement('a')
      a.href = url
      // @ts-ignore
      a.download = url.split('/').pop()
      a.target = '_blank';
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  isLogged() {
    return this.userService.isLogged();
  }

  uploadFile() {
    this.dialog.open(UploadFileDialogComponent, {
      data: {
        subject: this.subject?.id,
        university: this.university?.id,
        degree: this.degree?.id,
      },
    });
  }

  setData() {
    this.subjectService.getDegreeSubjects(this.subjectSlug?.toLowerCase())
      .subscribe(data => {
        this.subject = data;
        data?.degrees.map((degree) => {
          if (degree.slug === this.degreeSlug) {
            this.degree = degree;
          }
        })
        this.university = this.degree?.university;
        this.files = data?.files;

        data?.files.map((file) => {
          const categoryString = file?.category.toUpperCase();
          const index = Object.keys(Category).indexOf(categoryString);
          const category = Object.values(Category)[index];
          this.dataSourceArray.push({
            id: file?.id,
            name: file?.name,
            category: category,
            type: file?.type,
            user: file.user?.email,
            extra: file?.extra,
            url: file?.url,
          });
        });

        this.dataSource = new MatTableDataSource<any>(this.dataSourceArray);

        // @ts-ignore
        this.dataSource.paginator = this.paginator;

      });
  }

  getRecord(row: any) {
    if (!this.userService.isLogged()) {
      Report.warning(
        'No has iniciado sesión',
        'Debes iniciar sesión para poder acceder a los archivos',
        'Ok',
      );
    } else {
      this.router.navigate(['/file/details/', row.id.toString()]);
    }
  }

  resetSearch() {
    this.applyFilter(null);
    this.input.nativeElement.value = '';
  }

  share() {
    const shareUlr = environment.frontEndUlr + this.router.url;
    this.clipboard.copy(shareUlr);
    this.notificationService.showSuccesNotification('Enlace copiado al portapapeles');
  }

}
