import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})


export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer ;

  constructor( public usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;

    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }


    // console.log(this.usuario);

    this.usuarioService.actualizarUsuario( this.usuario )
      .subscribe();


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

  cambiarImagen() {
    this.usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
