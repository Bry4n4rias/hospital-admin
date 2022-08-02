import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  /*  esta propiedad sera visible y reutilozable antes toda la aplicacion
   asi si iniciamos otra variable en otro omponente como public usuario: Usuario y la igualamos a usuarioService.usuario
    en el constructor podremos acceder a la informacion de manera inmediata asi como de cambiar sus diferentes propiedades  */
  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid() {
    return this.usuario.uid;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  // verificar token para entrar en las paginas protegidas
  validarToken(): Observable<boolean> {
    return (
      this.http
        .get(`${baseUrl}/login/renew`, {
          headers: {
            'x-token': this.token,
          },
        })
        // como estamos renovando token, aca sobrescribimos el viejo por el nuevo
        .pipe(
          tap((resp: any) => {
            // creamos el usuario en angular, instanciamos la clase y llamamos a sus metodos
            const { email, google, nombre, role, img, uid } = resp.usuario;

            this.usuario = new Usuario(
              nombre,
              email,
              '',
              img,
              google,
              role,
              uid
            );
            this.usuario.imprimirUsuario();
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

  actualizarUsuario(data: { email: string; nombre: string; role: any }) {
    // reescribimos la data q viene por el parametro y le asignamos otra propiedad nueva q es el rol y q pide el backend
    data = {
      ...data,
      role: this.usuario.role,
    };

    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
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
