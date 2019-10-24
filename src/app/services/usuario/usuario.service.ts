import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

// ==================================
// clases
// ==================================
import { Usuario } from '../../models/usuario.model';


import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    // console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  estaLogeado() {

    if ( this.token === undefined ) {
      return;
    } else {
      return ( this.token.length > 3 ) ? true : false;
    }

  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  logout() {

    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);

  }

  loginGoogle( token: string ) {

    const url = `${ URL_SERVICIOS }/login/google`;

    return this.http.post( url, { token })
      .pipe(map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }));


  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }


    const url = `${ URL_SERVICIOS }/login`;

    return this.http.post(url, usuario).pipe(
      map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }),
      catchError(error => {
        console.error('HTTP Error', error.status);
        Swal.fire({
          title: 'Error de Acceso',
          // text: usuario.email,
          type: 'error',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        });
        throw error;
      })
    );


  }

  crearUsuario( usuario: Usuario ) {
    const url = `${URL_SERVICIOS}/usuario`;

    return this.http.post(url, usuario).pipe(
      map( (resp: any) => {
            Swal.fire({
              title: 'Usuario Creado',
              // text: usuario.email,
              type: 'success',
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false
            });

            return resp.usuario;
      }),
      catchError(err => {
            console.error('HTTP Error', err.status);
            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              type: 'error',
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false
            });
            throw err;
          })
      );
  }

  actualizarUsuario( usuario: Usuario ) {
    const url = `${URL_SERVICIOS}/usuario/${ usuario._id }?token=${ this.token }`;

    // console.log( url );
    return this.http.put( url, usuario ).pipe(
      map( (resp: any) => {

        // this.usuario = resp.usuario;
        if ( usuario._id === this.usuario._id ) {
          this.guardarStorage( resp.usuario._id, this.token, resp.usuario, this.menu );
        }

        Swal.fire({
          title: 'Usuario Actualizado',
          // text: usuario.email,
          type: 'success',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        });

        return true;

      }),
      catchError(err => {
            console.error('HTTP Error', err.status);
            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              type: 'error',
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false
            });
            throw err;
          })
      );


  }

  cambiarImagen( file: File, id: string ) {

    this.subirArchivoService.subirArchivo( file, 'usuarios', id )
      .then( (resp: any) => {
        // console.log( resp );

        this.usuario.img = resp.model.img;

                // this.usuario = resp.usuario;
        this.guardarStorage( this.usuario._id, this.token, this.usuario, this.menu );

        Swal.fire({
          title: 'Imagen de Usuario Actualizado',
          text: this.usuario.nombre,
          type: 'success',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        });


      })
      .catch( resp => {
        console.error( resp );
      });
  }

  cargarUsuarios( desde: number = 0 ) {

    const url = `${URL_SERVICIOS}/usuario?desde=${ desde }`;

    return this.http.get( url );

  }

  buscarUsuario( termino: string ) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${ termino }`;

    return this.http.get( url )
      .pipe(map( (resp: any) => resp.usuarios ));

  }

  eliminarUsuario( id: string ) {
    const url = `${URL_SERVICIOS}/usuario/${ id }?token=${ this.token }`;

    return this.http.delete( url );
  }

}
