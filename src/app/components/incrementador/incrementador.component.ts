import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso', { static: false }) txtProgreso: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;


  // OUTPUT PARA ENVIAR INFORACION DEL HIJO AL PADRE
  @Output() cambioValorHijo: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.porcentaje);
  }

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.porcentaje);
  }

  cambiarValor( valor: number ) {

    if ( this.porcentaje >= 100 && valor > 0 ) {
      this.porcentaje = 100;
      return;
    }

    if ( this.porcentaje <= 0 && valor < 0 ) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje = this.porcentaje + valor;

    this.cambioValorHijo.emit( this.porcentaje );

    this.txtProgreso.nativeElement.focus();

  }

  onChanges( newValue: number ) {
    // console.log( newValue );

    // const elementoHTML: any = document.getElementsByName('procentaje')[0];
    // console.log(elementoHTML.value);

    // console.log(this.txtProgreso);

    if ( newValue >= 100 ) {
      this.porcentaje = 100;
    } else if ( newValue <= 0 ) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }


    this.txtProgreso.nativeElement.value = this.porcentaje;
    // elementoHTML.value = this.porcentaje;

    this.cambioValorHijo.emit( this.porcentaje );
  }

}
