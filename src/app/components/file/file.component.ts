import {AfterViewInit, Component, OnInit, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "../../data/services/file.service";
import {Location} from "@angular/common";
import {UserService} from "../../data/services/user.service";
import {RatingService} from "../../data/services/rating.service";
import {Loading} from "notiflix/build/notiflix-loading-aio";
import {environment} from "../../../environments/environment";
import {Clipboard} from "@angular/cdk/clipboard";
import {NotificationService} from "../../data/services/notification.service";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit, AfterViewInit {
  fileId: string | undefined;
  file: { id: number, name: string, category: string, extra: string, rating: number, type: string, url: string, user: string } | undefined;
  isOwnFile: boolean = false;
  @ViewChildren('docViewer') docViewer: any;
  userRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private location: Location,
    private userService: UserService,
    private ratingService: RatingService,
    private clipboard: Clipboard,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    this.route.url.subscribe((url) => {
      this.fileId = url[2].path;
      this.fileService.getFile(this.fileId)
        .subscribe((file) => {
          this.file = file;
          this.isOwnFile = this.userService.getUserSub() === this.file?.user;
          this.ratingService.getFileUserRating(this.fileId, this.userService.getUserSub())
            .subscribe((rating) => {
              this.userRating = rating.rating;
            });
        });
    });
  }

  ngAfterViewInit() {
    Loading.pulse({
      svgColor: '#0D9488',
    });
  }

  ngOnInit(): void {
  }

  onRatingChange(event: any) {
    console.log(event)
    this.ratingService
      .setRating(this.fileId, this.userService.getUserSub(), event.rating)
      .subscribe((file) => {
        this.file = file;
      });
  }

  onLoaded() {
    Loading.remove();
  }

  share() {
    const shareUlr = environment.frontEndUlr + this.router.url;
    this.clipboard.copy(shareUlr);
    this.notificationService.showSuccesNotification('Enlace copiado al portapapeles');
  }

}
