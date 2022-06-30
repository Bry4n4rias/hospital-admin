import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo: string;

  public tituloSubs$: Subscription;
  constructor(private router: Router) {
    this.tituloSubs$ = this.getDataRuta().subscribe(({ titulo }) => {
      this.titulo = titulo;
      document.title = titulo;
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.tituloSubs$.unsubscribe();
  }

  getDataRuta() {
    return this.router.events.pipe(
      // como la data q recibo se muestra mediante instancias, evaluamos q sea de tipo ActivationEnd
      // y ya de ahi sacamos la data osea el titulo de la pagina
      filter((event) => event instanceof ActivationEnd),
      // como aparecen 2 ActivationEnd pq tenems rutas hijas, solo quiero el q diga firs child sea null, ese tendra la data
      filter((event: any) => event.snapshot.firstChild === null),
      map((event: any) => event.snapshot.data)
    );
  }
}
