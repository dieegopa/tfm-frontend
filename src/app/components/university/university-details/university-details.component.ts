import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {University} from "../../../shared/models/university.model";
import {UserService} from "../../../data/services/user.service";
import {UniversityService} from "../../../data/services/university.service";
import {DegreeService} from "../../../data/services/degree.service";
import {Degree} from "../../../shared/models/degree.model";
import {NotificationService} from "../../../data/services/notification.service";

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
    private degreeService: DegreeService,
    private notificationService: NotificationService,
  ) {
    this.userSub = this.userService.getUserSub();
    this.setDegrees();
  }

  ngOnInit(): void {
  }

  addFavorite() {
    if (!this.userService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      this.universityService.setFavoriteUniversity(this.university?.id || '', this.userSub || '')
        .subscribe(data => {
          this.favorite = data?.favorite;
          this.starName = this.favorite ? 'star' : 'star_border';

          if (this.favorite) {
            this.notificationService.showSuccesNotification('Añadido a favoritos');
          } else {
            this.notificationService.showSuccesNotification('Eliminado de favoritos');
          }

        });
    }
  }

  return() {
    this.router.navigate(['/university']);
  }

  addFavoriteDegree(degree: Degree) {
    if (!this.userService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      this.degreeService.setFavoriteDegree(degree.id || '', this.userSub || '')
        .subscribe(data => {
          degree.favorite = data?.favorite;
          if (degree.favorite) {
            this.notificationService.showSuccesNotification('Añadido a favoritos');
          } else {
            this.notificationService.showSuccesNotification('Eliminado de favoritos');
          }
        });
    }

  }

  setDegrees() {
    this.universityService.getUniversityDegrees(this.route.snapshot.params['slug'])
      .subscribe(data => {
        this.university = data;
        if (this.userService.isLogged()) {
          this.universityService.isFavoriteUniversity(this.university?.id || '', this.userSub || '')
            .subscribe(data => {
              this.favorite = data?.favorite;
              this.starName = this.favorite ? 'star' : 'star_border';
            })

          this.university?.degrees?.map(degree => {
            degree.users.map(user => {
              if (user.sub === this.userSub) {
                degree.favorite = true;
              }
            })
          })
        }
      })
  }

}
