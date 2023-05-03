import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {University} from "../../shared/models/university.model";
import {universities} from "../../shared/data/exampleData";
import {Degree} from "../../shared/models/degree.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../data/services/user.service";

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.css']
})
export class DegreeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'course', 'favorite'];
  dataSourceArray: any[] = [];
  dataSource = new MatTableDataSource<any>();
  universitySlug: string | undefined;
  degreeSlug: string | undefined;
  degree: Degree;
  university: University;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  starName: string = 'star_border';
  favorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
    this.route.url.subscribe((url) => {
      this.universitySlug = url[0].path;
      this.degreeSlug = url[1].path;
    });
    this.university = universities.filter((university) => {
      return university.slug == this.universitySlug;
    })[0];

    this.degree = this.university.degrees.filter((degree) => {
      return degree.slug == this.degreeSlug;
    })[0];

    this.formatData();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  return() {
    this.router.navigate(['/university/' + this.universitySlug]);
  }

  formatData() {
    this.degree.subjects.map((subject) => {
      this.dataSourceArray.push({
        id: subject.id,
        name: subject.name,
        slug: subject.slug,
        course: subject.course?.name,
        courseNumber: subject.course?.number,
        favorite: false,
      });
    });

    this.dataSource = new MatTableDataSource<any>(this.dataSourceArray);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter);
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecord(row: any) {
    this.router.navigate(['/' + this.universitySlug + '/subject/' + row.slug]);
  }

  addFavoriteSubject() {

    this.favorite = !this.favorite;

    this.starName = this.favorite ? 'star' : 'star_border';

    if (!this.userService.isLogged()) {
      this.router.navigate(['/login']);
    }
  }

  onChange($event: any) {
    const filterValue = $event.value;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.courseNumber == filter;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
