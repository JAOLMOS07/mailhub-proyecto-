import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Credentials, Login, User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //dirección http base de mi API
  private apiURL = 'http://apimailhub.test/api/v1/';

  //Headers de mi peticion http
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  //Tomar token del local storage
  getToken(): string {
    return JSON.parse(localStorage.getItem('token') || '{}');
  }

  //Guardar token en el local storage
  setToken(token: Login): void {
    localStorage.setItem('token', JSON.stringify(token.token));
  }

  //Guardar token en el local storage
  deleteToken(): void {
    localStorage.removeItem('token');
  }

  //Petición GET para obtener el usuario que está con la sesión activa
  getUser(token: Login): Observable<User> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.token}`,
      }),
    };
    return this.http
      .get<User>(this.apiURL + 'getUser', this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Peición POST logout
  logout(token: Login): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.token}`,
      }),
    };
    return this.http
      .post<User>(this.apiURL + 'logout', this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  //Petición POST para iniciar sesión
  login(credentials: Credentials): Observable<Login> {
    return this.http
      .post<Login>(this.apiURL + 'login', credentials, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  //Manipulador de errores
  errorHandler(error: any) {
    let errorMessage = { status: null, message: null };
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = { status: error.status, message: error.message };
    }
    return throwError(errorMessage);
  }
}
