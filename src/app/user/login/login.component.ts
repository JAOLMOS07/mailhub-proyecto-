import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Credentials, Login, User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  login!: Login;
  credentials!: Credentials;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    //verificamos la existencia de un token en el localstorage
    if (Object.entries(this.userService.getToken()).length !== 0) {
      this.login = { token: this.userService.getToken() };

      this.userService.getUser(this.login).subscribe(
        (res: User) => {
          // Ya existe un usuario válido con la sesión iniciada, no puede acceder al Login.
          console.log(res);
          this.router.navigateByUrl('user/register');
        },
        (error: any) => {
          // La sesión Ha caducado, deve volver a iniciar Sesión
          if (error.status === 401) {
            console.error('ERROR 401 La sesion ha caducado:', error.message);
            this.userService.deleteToken();
          }
        }
      );
    } else {
      console.log('Bienvenido, puede iniciar Sesión.');
    }

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.form.controls;
  }
  verify(): void {}
  submit(): void {
    this.credentials = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.userService.login(this.credentials).subscribe((res: Login) => {
      // El inicio de sesión fue exitoso, manejamos la respuesta
      this.userService.setToken(res);
      this.router.navigateByUrl('user/register');
    });
  }
}
