import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../data/services/user.service";
import {Router} from "@angular/router";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.formReg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(r => {
        const user = new User(r.user.uid, r.user.email);
        this.userService.registerBackend(user).subscribe(
          r => {
            if (r.status == 200) {
              this.router.navigate(['/login']);
            }
          }
        );
      })
      .catch(e => {
        console.log(e);
      })
  }

}
