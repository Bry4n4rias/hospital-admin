import { Usuario } from '../models/usuario.model';

export interface CargarUsuario {
  totalUsuarios: number;
  usuarios: Usuario[];
}
