import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

import Swal from 'sweetalert2';
import { MedicoService } from '../../services/medico/medico.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  forma: FormGroup;

  hospitales: Hospital[] = [];
  hospitalImagen: Hospital = new Hospital('');
  medico: Medico;

  constructor(
    public hospitalService: HospitalService,
    public medicoService: MedicoService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {

    activateRoute.params.subscribe( params => {
      const id = params.id;

      if ( id !== 'nuevo' ) {
        this.cargarMedico(id);
      } else {
        this.medico = null;
      }

    });
  }

  ngOnInit() {

    this.hospitalService.cargarHospitales()
      .subscribe( (resp: any) => this.hospitales =  resp.hospital);

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      hospital: new FormControl( null, Validators.required )
    });

    this.forma.setValue({
      nombre: '',
      hospital: ''
    });

    this.modalUploadService.notificacion
      .subscribe( resp => this.medico.img = resp.model.img );

  }

  cargarMedico( id: string ) {

    this.medicoService.cargarMedico( id )
      .subscribe( (resp: any) => {

        this.medico = resp.medico;
        this.medico.hospital = resp.medico.hospital._id;

        this.forma.setValue({
          nombre: this.medico.nombre,
          hospital: this.medico.hospital
        });


        this.cambioHospital( this.medico.hospital );


      });
  }


  guardarMedico() {

    if ( this.forma.invalid ) {
      return;
    }

    const nombrePaso = this.forma.value.nombre.trim();

    if ( nombrePaso.length <= 0 ) {
      return;
    }

    let id = null;

    if ( this.medico !== null ) {
      id = this.medico._id;
    }

    const medico = new Medico(
      this.forma.value.nombre,
      null,
      '',
      this.forma.value.hospital,
      id
    );

    this.medicoService.guardarMedico( medico )
      .subscribe( ( resp: any) => {
        Swal.fire(
          'Información Ingresada',
          `${ medico.nombre }`,
          'success'
        );

        this.medico = resp;

        this.router.navigate(['/medico', this.medico._id]);

      });

  }

  cambioHospital( id: string ) {

    this.hospitalService.obtenerHospital( id )
      .subscribe( (resp: any) => this.hospitalImagen = resp.hospital );

  }

  cambiarFoto() {

    this.modalUploadService.mostrarModal( 'medicos', this.medico._id );

  }

}
