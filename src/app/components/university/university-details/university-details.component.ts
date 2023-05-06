import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {University} from "../../../shared/models/university.model";
import {UserService} from "../../../data/services/user.service";
import {UniversityService} from "../../../data/services/university.service";
import {universities} from "../../../shared/data/exampleData";

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.css']
})
export class UniversityDetailsComponent implements OnInit {

  university: University | undefined;
  starName: string = 'star_border';
  favorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private universityService: UniversityService,
  ) {
    this.setDegrees();
  }

  ngOnInit(): void {
  }

  addFavorite() {
    if (!this.userService.isLogged()) {
      this.router.navigate(['/login']);
    }

    this.favorite = !this.favorite;

    this.starName = this.favorite ? 'star' : 'star_border';
  }

  return() {
    this.router.navigate(['/university']);
  }

  addFavoriteDegree() {
    if (!this.userService.isLogged()) {
      this.router.navigate(['/login']);
    }
  }

  setDegrees() {
    this.universityService.getUniversityDegrees(this.route.snapshot.params['slug'])
      .subscribe(data => {
        this.university = new University(data?.id, data?.name, data?.image_url, data?.slug, data?.degrees, data?.users);
      })
  }

  // setUniversity(query: string) {
  //   this.universities = [];
  //   this.universityService.getFilteredUniversity(query)
  //     .subscribe(data => {
  //       data?.map((university: University) => {
  //         this.universities.push(
  //           new University(university.id, university.name, university.image_url, university.slug, university.degrees, university.users)
  //         )
  //       })
  //     });
  // }


}
