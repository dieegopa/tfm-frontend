import {ApplicationRef, Component, OnChanges, OnInit} from '@angular/core';
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

  isLogged: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  isShowDivIf = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLogged = this.userService.isLogged();
    }, 500);
  }

  logout() {
    this.userService.logout()
      .then(r => {
          this.router.navigate(['/']).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 300);
          })
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
