import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit {
  public medicos: Medico[] = [];
  public cargando: boolean = true;

  constructor(
    private medicosService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedaService
  ) {}

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', termino).subscribe((resp) => {
      this.medicos = resp!;
    });
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.modalImagenService.nuevaImagen
      // hacemos un delay para darle tiempo al server q haga el cambio
      .pipe(delay(100))
      .subscribe((img) => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicosService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img);
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: 'Borrar medico?',
      text: `Esta a punto de eliminar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.eliminarMedico(medico._id!).subscribe((resp) => {
          this.cargarMedicos();
          Swal.fire(
            'Medico eliminado',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }
}
