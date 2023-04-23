import {Component, OnInit} from '@angular/core';
import {UserService} from "../../data/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  isLogged() {
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
}
