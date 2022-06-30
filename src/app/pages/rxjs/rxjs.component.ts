import { Component, OnDestroy } from '@angular/core';
import {
  Observable,
  retry,
  interval,
  take,
  map,
  filter,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.intervalSubs.unsubscribe(); // cuando se elimine el componente se desuscribe
  }
  public intervalSubs: Subscription;

  constructor() {
    // ciclo del subscribe, contiene los 3 metodos del observer next, error y complete
    // next es el valor q emite el observer
    // el error por si algun error
    // y el complete cuando finaliza, no necesita ponerle nombre al argumento
    // el retry es reintentar si sale un errror
    // this.retornaObservable()
    //   .pipe(retry(2))
    //   .subscribe(
    //     (valor) => console.log('Subs:', valor),
    //     (err) => console.warn('Error', err),
    //     () => console.log('Fin')
    //   );
    this.intervalSubs = this.retornaIntervalo().subscribe((valor) =>
      console.log(valor)
    );
  }

  retornaIntervalo(): Observable<number> {
    // el take es la cantidad de veces q quiero q itere el interval por ejemplo
    return interval(100).pipe(
      take(100), // si ponemos el take antes emite las 10 pero por ejemplo solo imprimira 5 numeros pares, pq los otros son false
      // si ponemos el take desps se ejecutara 10 pq el filter me esta arrojando 10 trues

      // con el map transformamos los valores q vienen, en este caso le sumamos 3
      map((valor) => valor + 1), // aca primero ejecutaria el +1 y desps muestar por consola desde el 11, con el 1 ya sumado
      map((valor) => valor + 10),
      filter((valor) => (valor % 2 === 0 ? true : false)) // si el valor es par me pasa true osea imprime el numero si no , no
    );
  }

  retornaObservable(): Observable<number> {
    let i = 0;
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 6) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          i = 0;
          observer.error('i llego a 2');
        }
      }, 1000);
    });
  }
}
