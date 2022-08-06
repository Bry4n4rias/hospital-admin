import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;

  // asi podemos estar pendientes de algun cambio en la imagen y asi actualizar la pagina para q se muestre de inmediato
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-img'
    // si no viene imagen , se muestra la no img por defecto
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // ocnstrumios el path de la imagen
    this.img = `${baseUrl}/upload/${tipo}/${img}`;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() {}
}
