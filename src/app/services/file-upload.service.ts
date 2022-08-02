import { compileDeclareInjectableFromMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async actualizarImagen(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;

      // esto es otra forma de utilizar http, este es el propio de JS
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const data = await resp.json();

      console.log(data);

      if (data.ok) {
        return data.nombreArchivo;
      } else {
        return false;
      }

      return 'nombre de imagen';
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}
