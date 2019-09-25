import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcription: Subscription;


  constructor() {

    // this.regresaObservable().pipe(
    //   retry(2)
    //  )
    this.subcription = this.regresaObservable()
    .subscribe(
      numero => console.log('Sub ', numero),
      error => console.error('Error en el Obs', error),
      () => console.log('El Observador Termino')
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se  va ha cerrar');
    this.subcription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;
      const intervalo = setInterval( () => {

        contador ++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error('auxilio!!!');
        // }


      }, 1000);

    }).pipe(
      map( resp => resp.valor),
      filter( ( valor, index ) => {
        // console.log('Filter ', valor, index);
        if ( ( valor % 2 ) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }

}
