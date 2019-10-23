import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = true;
  totalRegistros: number = 0;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion
      .subscribe( () => this.cargarHospitales() );
  }

  mostrarModal( id: string ) {
    this.modalUploadService.mostrarModal('hospitales', id);
  }

  cargarHospitales() {
    this.cargando = true;

    this.hospitalService.cargarHospitales()
    .subscribe( (resp: any) => {

      this.hospitales = resp.hospital;
      this.totalRegistros = resp.total;

    });

    this.cargando = false;
  }

  eliminarHospital( hospital: Hospital ) {

    Swal.fire({
      title: 'Confirme Eliminación',
      text: `Confirme eliminación dl usuario ${ hospital.nombre }`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {

        this.hospitalService.eliminarHospital( hospital._id )
          .subscribe( () => {

            this.cargarHospitales();

            Swal.fire(
              'Eliminado!',
              'Hospital ha sido eliminado.',
              'success'
            );

          });


      }
    });
  }

  actualizarHospital( hospital: Hospital ) {

    this.hospitalService.actualizarHospital( hospital )
      .subscribe( () => {
         Swal.fire({
          title: 'Hospital Actualizado',
          text: hospital.nombre,
          type: 'success',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        });

      });

  }

  buscarHospital( termino: string ) {

    termino = termino.trim();

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this.hospitalService.buscarHospital( termino )
      .subscribe( (hospitales =>  this.hospitales = hospitales));

    this.cargando = false;
  }

  crearHospital() {
     Swal.fire({
          title: 'Crear Hospital',
          input: 'text',
          type: 'info',
          inputPlaceholder: 'Ingrese el nombre del nuevo hospital',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false,
          showCancelButton: true
        }).then( (result) => {

          if (result.value) {

            this.hospitalService.crearHospital( result.value )
              .subscribe( () => {

                this.cargarHospitales();

              });
          }
        });

  }

}
