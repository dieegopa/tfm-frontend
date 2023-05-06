import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {University} from "../../shared/models/university.model";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../data/services/user.service";
import {universities} from "../../shared/data/exampleData";
import {Subject} from "../../shared/models/subject";
import {File} from "../../shared/models/file.model";
import {UploadFileDialogComponent} from "../upload-file-dialog/upload-file-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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
  subject: Subject;
  university: University;
  files: File[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  starName: string = 'star_border';
  favorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
  ) {
    this.route.url.subscribe((url) => {
      this.universitySlug = url[0].path;
      this.subjectSlug = url[2].path;
    });

    this.university = universities.filter((university) => {
      return university.slug == this.universitySlug;
    })[0];

    this.subject = this.university.degrees.map((degree) => {
      return degree.subjects.filter((subject) => {
        this.degreeSlug = degree.slug;
        return subject.slug == this.subjectSlug;
      })[0];
    })[0];

    this.files = this.subject.files;

    this.formatData();

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  return() {
    this.router.navigate(['/' + this.universitySlug + '/' + this.degreeSlug]);
  }

  formatData() {
    this.files.map((file) => {
      this.dataSourceArray.push({
        id: file.id,
        name: file.name,
        category: file.category,
        type: file.type,
        user: 'Juan Perez',
      });
    });

    this.dataSource = new MatTableDataSource<any>(this.dataSourceArray);

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


}
