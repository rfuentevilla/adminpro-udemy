import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from '../../config/config';

import { UsuarioService } from '../usuario/usuario.service';

// ==================================
// IMPORTAR LAS CLASE HOSPITAL
// ==================================
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService
  ) { }

  cargarHospitales() {
    const url = `${ URL_SERVICIOS }/hospital`;

    return this.http.get( url );

  }

  obtenerHospital( id: string ) {

    const url = `${ URL_SERVICIOS }/hospital/${ id }?token=${ this.usuarioService.token }`;
    return this.http.get( url );

  }

  eliminarHospital( id: string ) {

    const url = `${ URL_SERVICIOS }/hospital/${id}?token=${ this.usuarioService.token }`;

    return this.http.delete( url );

  }

  crearHospital( nombre: string ) {

    const url = `${ URL_SERVICIOS }/hospital/?token=${ this.usuarioService.token }`;

    return this.http.post( url, { nombre } )
     .pipe(map( (resp: any) => resp.hospital));

  }

  buscarHospital( termino: string ) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${ termino }`;

    return this.http.get( url )
      .pipe(map( (resp: any) => resp.hospitales ));
  }

  actualizarHospital( hospital: Hospital ) {

    const url = `${URL_SERVICIOS}/hospital/${ hospital._id }?token=${ this.usuarioService.token }`;

    return this.http.put( url, hospital )
      .pipe(map( (resp: any) => resp.hospital ));

  }

}
