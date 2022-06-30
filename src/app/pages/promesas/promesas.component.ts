import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuarios().then((users) => {
      console.log(users);
    });
    //   const promesas = new Promise((resolve, reject) => {
    //     if (false) {
    //       resolve('hola mundo');
    //     } else {
    //       reject('algo salio mal');
    //     }
    //   });

    //   promesas
    //     .then((mensaje) => {
    //       console.log(mensaje);
    //     })
    //     .catch((error) => {
    //       console.log('Error en promesa');
    //     });

    //   console.log('fin init');
  }
  getUsuarios() {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users?page=2')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });
  }
}
