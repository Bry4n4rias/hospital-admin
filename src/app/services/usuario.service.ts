import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  // verificar token para entrar en las paginas protegidas
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return (
      this.http
        .get(`${baseUrl}/login/renew`, {
          headers: {
            'x-token': token,
          },
        })
        // como estamos renovando token, aca sobrescribimos el viejo por el nuevo
        .pipe(
          tap((resp: any) => {
            localStorage.setItem('token', resp.token);
          }),
          // si hay respuesta, osea si ya hay token retorna true
          map((resp) => {
            return true;
          }),
          catchError((error) => of(false))
        )
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/usuarios`, formData).pipe(
      // el tap No es tanto un efecto pensado para alterar el flujo de datos, sino para facilitar efectos colaterales.
      //Por ejemplo, si quieres guardar un evento en localstorage
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  login(formData: LoginForm) {
    // esto retorna un observable, q antes de suscribirme en el logints le hacemos un pipe para hacer algo,
    // ya cuando nos suscribamos tendremos todo ya completo
    return this.http.post(`${baseUrl}/login`, formData).pipe(
      // el tap No es tanto un efecto pensado para alterar el flujo de datos, sino para facilitar efectos colaterales.
      //Por ejemplo, si quieres guardar un evento en localstorage
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
