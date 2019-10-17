import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor( public usuarioService: UsuarioService,
               public modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion
      .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuarioService.cargarUsuarios( this.desde )
      .subscribe( (resp: any) => {

        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;

      });

    this.cargando = false;

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

    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {

    // console.log( termino );
    termino = termino.trim();

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuario( termino )
      .subscribe( (usuarios: Usuario[]) => {

        // console.log( usuarios );

        this.usuarios = usuarios;

      });

    this.cargando = false;
  }

  eliminarUsuario( usuario: Usuario ) {

    if ( usuario._id === this.usuarioService.usuario._id ) {
      Swal.fire({
        title: 'No se puede eliminar usuario',
        text: 'No puede borrarse a si mismo.',
        type: 'warning',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      });
      return;
    }

    Swal.fire({
      title: 'Confirme Eliminación',
      text: `Confirme eliminación dl usuario ${ usuario.nombre }`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {

        this.usuarioService.eliminarUsuario( usuario._id )
          .subscribe( resp => {

            this.cargarUsuarios();

            Swal.fire(
              'Eliminado!',
              'Uusario ha sido eliminado.',
              'success'
            );

          });


      }
    });

  }

  guardarUsuario( usuario: Usuario ) {

    this.usuarioService.actualizarUsuario( usuario )
    .subscribe();

  }
}
