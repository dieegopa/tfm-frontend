import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
import {RouterExtService} from "../../data/services/router.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'category', 'usuario', 'actions'];
  dataSourceArray: any[] = [];
  dataSource = new MatTableDataSource<any>();
  universitySlug: string | undefined;
  degreeSlug: string | undefined;
  subjectSlug: string | undefined;
  subject: Subject | null | undefined;
  university: University | null | undefined;
  files: File[] | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private subjectService: SubjectService,
    private routerExtService: RouterExtService,
    private location: Location,
  ) {
    this.route.url.subscribe((url) => {
      this.universitySlug = url[0].path;
      this.subjectSlug = url[2].path;
    });

    this.setData();

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  return() {
    this.location.back();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.category.toLowerCase().includes(filter) || data.user.toLowerCase().includes(filter);
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  download(id: string) {
    if (!this.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      alert('Descargando archivo con id: ' + id);
    }
  }

  isLogged() {
    return this.userService.isLogged();
  }

  uploadFile() {
    this.dialog.open(UploadFileDialogComponent, {
      data: {
        subject: this.subjectSlug,
      },
    });
  }

  setData() {
    this.subjectService.getDegreeSubjects(this.subjectSlug?.toLowerCase())
      .subscribe(data => {
        this.subject = data;
        this.university = data?.degrees[0].university;
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
            user: file.user?.email
          });
        });

        this.dataSource = new MatTableDataSource<any>(this.dataSourceArray);

      });
  }

}
