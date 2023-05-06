import {Component, OnInit} from '@angular/core';
import {UserService} from "../../data/services/user.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UploadFileDialogComponent} from "../../components/upload-file-dialog/upload-file-dialog.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  isShowDivIf = false;

  ngOnInit(): void {
  }

  isLogged() {
    //return true;
    return this.userService.isLogged();
  }

  logout() {
    this.userService.logout()
      .then(r => {
          this.router.navigate(['/']);
        }
      )
      .catch(e => {
        console.log(e);
      })
  }

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }

  toggleLink() {
    if (this.isShowDivIf) {
      this.isShowDivIf = false;
    }
  }

  uploadFile() {
    this.dialog.open(UploadFileDialogComponent);
  }


}
