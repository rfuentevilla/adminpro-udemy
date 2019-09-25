import { Component, OnInit, Inject } from '@angular/core';

import { SettingService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public ajustes: SettingService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any) {
    // console.log(link);
    this.aplicarCheck(link);

    this.ajustes.aplicarTema( tema );
  }

  aplicarCheck(link: any) {
    // tslint:disable-next-line:prefer-const
    let selectores: any = document.getElementsByClassName('selector');
    // tslint:disable-next-line:prefer-const
    for ( let ref of selectores ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    // tslint:disable-next-line:prefer-const
    let selectores: any = document.getElementsByClassName('selector');

    const tema = this.ajustes.ajustes.tema;

     // tslint:disable-next-line:prefer-const
    for ( let ref of selectores ) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }

  }

}
