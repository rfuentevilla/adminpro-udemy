import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  // oculto: string = '';
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer ;

  constructor( public subrirArchivoService: SubirArchivoService,
               public modalService: ModalUploadService ) {
   }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this.modalService.ocutarModal();

  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    // ==================================
    // VERIFIAR SI EL ARCHIVO ES IMAGEN
    // ==================================
    if ( archivo.type.indexOf('image') < 0 ) {
      Swal.fire({
        title: 'Solo Imagenes',
        text: 'El archivo seleccionado NO es una imagen',
        type: 'error',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      });

      this.imagenSubir = null;

      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImgTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  subirImagen() {

    this.subrirArchivoService.subirArchivo( this.imagenSubir, this.modalService.tipo, this.modalService.id )
      .then( resp => {

        this.modalService.notificacion.emit( resp );
        this.cerrarModal();

      })
      .catch( err => {
        console.log('Error en la carga de la imagen');
      });
  }
}
