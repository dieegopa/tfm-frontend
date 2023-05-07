import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {University} from "../../../shared/models/university.model";
import {UserService} from "../../../data/services/user.service";
import {UniversityService} from "../../../data/services/university.service";

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.css']
})
export class UniversityDetailsComponent implements OnInit {

  university: University | null | undefined;
  starName: string = 'star_border';
  favorite: Object | null | undefined = false;
  userSub: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private universityService: UniversityService,
  ) {
    this.setDegrees();
    this.userSub = this.userService.getUserSub();
  }

  ngOnInit(): void {
  }

  addFavorite() {
    if (!this.userService.isLogged()) {
      this.router.navigate(['/login']);
    }

    this.universityService.setFavoriteUniversity(this.university?.id || '', this.userSub || '')
      .subscribe(data => {
        this.favorite = data?.favorite;
        this.starName = this.favorite ? 'star' : 'star_border';
      })
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
        this.university = data;
        this.universityService.isFavoriteUniversity(this.university?.id || '', this.userSub || '')
          .subscribe(data => {
            this.favorite = data?.favorite;
            this.starName = this.favorite ? 'star' : 'star_border';
          })
      })
  }

}
