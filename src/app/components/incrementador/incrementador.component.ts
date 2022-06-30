import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent {
  // recibimos el valor del padre
  @Input('valorProgreso') progreso: number = 50;
  @Input() btnClass: string = 'btn btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  // cambiamos el valor de 5 en 5
  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(100);
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  // evaluamos para que el input manual no sea mayor a 100 o menor a 0, el onchange fue un nombre al asar
  onChange(valorInputManual: number) {
    if (valorInputManual >= 100) {
      this.progreso = 100;
    } else if (valorInputManual <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valorInputManual;
    }
    this.valorSalida.emit(this.progreso);
  }
}
