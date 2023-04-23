import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../data/services/user.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private cookies: CookieService,
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(r => {
        r.user.getIdToken(true)
          .then((idToken) => {
            this.cookies.set('token', idToken);
          });
        this.router.navigate(['/main']);
      })
      .catch(e => {
        console.log(e);
      })
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(r => {
        const user = new User(r.user.uid, r.user.email);
        this.userService.registerBackend(user).subscribe(
          r => {
            if (r.status == 200) {
              this.router.navigate(['/main']);
            }
          }
        );

        r.user.getIdToken(true)
          .then((idToken) => {
            this.cookies.set('token', idToken);
          });
        this.router.navigate(['/main']);
      })
      .catch(e => {
        console.log(e);
      })
  }
}
