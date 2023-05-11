import {AfterViewInit, Component, OnInit, ViewChildren} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FileService} from "../../data/services/file.service";
import {Location} from "@angular/common";
import {UserService} from "../../data/services/user.service";
import {RatingService} from "../../data/services/rating.service";
import {Loading} from "notiflix/build/notiflix-loading-aio";

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

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private location: Location,
    private userService: UserService,
    private ratingService: RatingService,
  ) {
    this.route.url.subscribe((url) => {
      this.fileId = url[2].path;
      this.fileService.getFile(this.fileId)
        .subscribe((file) => {
          this.file = file;
          this.isOwnFile = this.userService.getUserSub() === this.file?.user;
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
    this.ratingService
      .setRating(this.fileId, this.userService.getUserSub(), event.rating)
      .subscribe((file) => {
        this.file = file;
      });
  }

  onLoaded() {
    Loading.remove();
  }

}
