import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {University} from "../../../shared/models/university.model";
import {Degree} from "../../../shared/models/degree.model";
import {UserService} from "../../../data/services/user.service";
import {universities} from "../../../shared/data/exampleData";

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.css']
})
export class UniversityDetailsComponent implements OnInit {

  university: University;
  starName: string = 'star_border';
  favorite : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {
    this.university = universities.filter((university) => {
      return university.slug == this.route.snapshot.params['slug'];
    })[0];
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


}
