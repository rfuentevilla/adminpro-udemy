import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService
  ) { }

  cargarMedicos( desde: number = 0 ) {
    const url = `${ URL_SERVICIOS }/medico?desde=${ desde }`;

    return this.http.get( url );
  }

  buscarMedico( termino: string ) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${ termino }`;

    return this.http.get( url )
      .pipe(map( (resp: any) => resp.medicos ));

  }

  cargarMedico( id: string ) {
    const url = `${ URL_SERVICIOS }/medico/${ id }`;

    return this.http.get( url );
  }

  eliminarMedico( id: string ) {
    const url = `${ URL_SERVICIOS }/medico/${id}?token=${ this.usuarioService.token }`;

    return this.http.delete( url );
  }

  guardarMedico( medico: Medico ) {

    console.log('El medico es ' + medico);


    let url = `${ URL_SERVICIOS }/medico`;

    if ( medico._id ) {
      url += `/${ medico._id }?token=${ this.usuarioService.token }`;

      return this.http.put( url, medico )
        .pipe(map( (resp: any) => resp.medico));

    } else {
      url += `/?token=${ this.usuarioService.token }`;

      return this.http.post( url, medico )
        .pipe(map( (resp: any) => resp.medico));

    }


  }

}
