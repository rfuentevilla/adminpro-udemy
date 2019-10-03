import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


// ==================================
// servicios
// ==================================
import { UsuarioService } from '../services/service.index';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

// ==================================
// MODELOS
// ==================================
import { Usuario } from '../models/usuario.model';


// init_plugins
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './login.component.css' ]
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales(campo1: string, campo2: string) {

    return ( group: FormGroup ) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }


      return {
        sonIguales: true
      };

    };

  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password', 'password2' ) });

    this.forma.setValue({
      nombre: 'Test ',
      correo: 'test1@text.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });

  }


  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      Swal.fire({
        title: 'Importante!',
        text: 'Debe de aceptar las condiciones',
        type: 'warning',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      });

      console.log('Debe de Aceptar las condiciones');
      return;
    }


    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this.usuarioService.crearUsuario( usuario )
      .subscribe( resp => this.router.navigate(['/login']));


    // console.log('Forma válida', this.forma.valid );


    // console.log( this.forma.value );
  }

}
