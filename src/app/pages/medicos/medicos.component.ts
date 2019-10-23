import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean = true;
  totalRegistros: number = 0;
  desde: number = 0;

  constructor(
    public medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;

    this.medicoService.cargarMedicos( this.desde )
    .subscribe( (resp: any) => {
       this.medicos = resp.medico;
       this.totalRegistros = resp.total;
    });

    this.cargando = false;
  }

  buscarMedico( termino: string ) {

    termino = termino.trim();

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this.medicoService.buscarMedico( termino )
      .subscribe( (medicos =>  this.medicos = medicos));

    this.cargando = false;

  }

  crearHospital() {

  }

  actualizarMedico( medico: Medico ) {

  }

  eliminarMedico( medico: Medico ) {

    Swal.fire({
      title: 'Confirme Eliminación',
      text: `Confirme eliminación dl usuario ${ medico.nombre }`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {

        this.medicoService.eliminarMedico( medico._id )
          .subscribe( () => {

            this.cargarMedicos();

            Swal.fire(
              'Eliminado!',
              'Médico ha sido eliminado.',
              'success'
            );

          });


      }
    });

  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;

    this.cargarMedicos();

  }
}
