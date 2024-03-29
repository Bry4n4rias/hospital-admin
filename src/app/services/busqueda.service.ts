import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformarUsuario(resultados: any[]): Usuario[] {
    // esto se hace para q pueda cargar las imagenes cuando se busca un usuarios
    // instanciamos la clase para poder tener referencia a la url de la imagen
    return resultados.map(
      (user) =>
        new Usuario(
          user.nombre,
          user.email,
          '',
          user.img,
          user.google,
          user.role,
          user.uid
        )
    );
  }

  private transformarHospitales(resultados: any[]): Hospital[] {
    // esto se hace para q pueda cargar las imagenes cuando se busca un usuarios
    // instanciamos la clase para poder tener referencia a la url de la imagen
    return resultados;
  }

  private transformarMedicos(resultados: any[]): Medico[] {
    // esto se hace para q pueda cargar las imagenes cuando se busca un usuarios
    // instanciamos la clase para poder tener referencia a la url de la imagen
    return resultados;
  }

  busquedaGlobal(termino: string) {
    const url = `${baseUrl}/todo/${termino}`;
    return this.http.get(url, this.headers);
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${baseUrl}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuario(resp.resultados);
          case 'hospitales':
            return this.transformarHospitales(resp.resultados);
          case 'medicos':
            return this.transformarMedicos(resp.resultados);

          default:
            break;
        }
      })
    );
  }
}
