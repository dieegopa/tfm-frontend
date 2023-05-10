import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {University} from "../../shared/models/university.model";
import {Degree} from "../../shared/models/degree.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../data/services/user.service";
import {DegreeService} from "../../data/services/degree.service";
import {CourseService} from "../../data/services/course.service";
import {SubjectService} from "../../data/services/subject.service";
import {Subject} from "../../shared/models/subject.model";
import {NotificationService} from "../../data/services/notification.service";

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
  degree: Degree | undefined;
  university: University | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  starName: string = 'star_border';
  favorite: boolean = false;
  courses: any[] = [];
  userSub: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private degreeService: DegreeService,
    private courseService: CourseService,
    private subjectService: SubjectService,
    private notificationService: NotificationService,
  ) {
    this.route.url.subscribe((url) => {
      this.universitySlug = url[0].path;
      this.degreeSlug = url[1].path;
    });

    this.userSub = this.userService.getUserSub();
    this.setData()
    this.setCourseData()
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  return() {
    this.router.navigate(['/university/' + this.universitySlug]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter);
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecord(row: any) {
    this.router.navigate(['/' + this.universitySlug + '/degree/' + this.degreeSlug + '/subject/' + row.slug] );
  }

  addFavoriteSubject(subject: Subject) {

    if (!this.userService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      this.subjectService.setFavoriteSubject(subject.id, this.userService.getUserSub())
        .subscribe(data => {
          subject.favorite = data?.favorite;

          if (subject.favorite) {
            this.notificationService.showSuccesNotification('Añadido a favoritos');
          } else {
            this.notificationService.showSuccesNotification('Eliminado de favoritos');
          }
        });
    }


  }

  onChange($event: any) {
    const filterValue = $event.value;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.courseNumber == filter;
    }

    this.dataSource.filter = filterValue;
  }

  setData() {
    this.degreeService.getUniversityDegree(this.universitySlug, this.degreeSlug)
      .subscribe(data => {
        data?.map((degree) => {
          this.degree = degree;

          if (this.userService.isLogged()) {
            this.degree.subject.map((subject) => {
              subject.users.map((user) => {
                if (user.sub == this.userSub) {
                  subject.favorite = true;
                }
              })
            });
          }

          degree.subject.map((subject) => {
            this.dataSourceArray.push({
              id: subject.id,
              name: subject.name,
              slug: subject.slug,
              course: subject.course?.name,
              courseNumber: subject.course?.number,
              favorite: subject.favorite,
            });
          });

          this.dataSource = new MatTableDataSource<any>(this.dataSourceArray);
        })
      })
  }

  setCourseData() {
    this.courseService.getDegreeCourses(this.degreeSlug)
      .subscribe(data => {
        data?.map((course) => {
          this.courses.push({
            number: course.id,
            name: course.name,
          })
        })
      })
  }
}
