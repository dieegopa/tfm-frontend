import {Component, OnInit} from '@angular/core';
import {UserService} from "../../data/services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Confirm} from "notiflix";
import {NotificationService} from "../../data/services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userEmail: string;
  formChangePassword: FormGroup;
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;
  changePassword: string = '';

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    this.userEmail = this.userService.getUserEmail();
    this.formChangePassword = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.changePassword(this.changePassword.trim()).then(r => {
      this.notificationService.showSuccesNotification('Contraseña cambiada correctamente');
      setTimeout(() => {
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
      }, 100)
    })

  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Debes ingresar una contraseña';
    }

    return this.password.hasError('minlength') ? 'La contraseña debe tener al menos 6 caracteres' : '';
  }


  deleteUser() {
    Confirm.show(
      'Darse de baja',
      'Estas seguro que quieres darte de baja? No podras recuperar todos tus datos.',
      'Si',
      'No',
      () => {
        this.userService.deleteUserFirebase().then(r => {
          this.userService.deleteUserBackend().subscribe(r => {
            this.notificationService.showSuccesNotification('Se ha dado de baja correctamente');
            setTimeout(() => {
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
            }, 100)
          });
        })
      },
      () => {

      },
      {
        titleColor: '#0D9488',
        okButtonColor: '#FFF',
        okButtonBackground: '#f44336',
      },
    );
  }

}
