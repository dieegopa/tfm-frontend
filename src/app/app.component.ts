import {Component} from '@angular/core';
import {UserService} from "./data/services/user.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tfm-front';
  isLogged: boolean = false;
  cookie: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService,
  ) {

    setTimeout(() => {
      this.isLogged = this.userService.isLogged();

      if (localStorage.getItem('logged') == 'true' && !this.isLogged) {
        this.userService.logout()
          .then(r => {
              localStorage.setItem('logged', 'false');
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
    }, 1000);

  }
}
