import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public desde: number = 0;
  public totalHospitales: number = 0;
  public hospitalesTemp: Hospital[] = [];

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedaService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.modalImagenService.nuevaImagen
      // hacemos un delay para darle tiempo al server q haga el cambio
      .pipe(delay(100))
      .subscribe((img) => this.cargarHospitales());
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }

    this.busquedaService.buscar('hospitales', termino).subscribe((resp) => {
      this.hospitales = resp!;
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
      // this.hospitalesTemp = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospitales(hospital._id!, hospital.nombre)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.eliminarHospitales(hospital._id!).subscribe((resp) => {
      this.cargarHospitales();
      Swal.fire('Eliminado', hospital.nombre, 'success');
    });
  }

  async abrirModalSweet() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingres el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value!.trim().length > 0) {
      this.hospitalService.crearHospitales(value!).subscribe((resp) => {
        this.cargarHospitales();
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id!,
      hospital.img
    );
  }

  // cambiarPagina(valor: number) {
  //   this.desde += valor;

  //   if (this.desde < 0) {
  //     this.desde = 0;
  //   } else if (this.desde > this.totalHospitales) {
  //     this.desde -= valor;
  //   }
  //   this.cargarHospitales();
  // }
}
