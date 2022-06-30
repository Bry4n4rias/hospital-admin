import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Principal', url: '' },
        { titulo: 'Progressbar', url: 'progress' },
        { titulo: 'Grafica', url: 'grafica1' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'RxJs', url: 'rxjs' },
      ],
    },
  ];

  constructor() {}
}
