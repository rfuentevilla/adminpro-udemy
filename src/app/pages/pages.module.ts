import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';

// MODULO DE SHARED
import { SharedModule } from '../shared/shared.module';

// RUTAS HIJAS
import { PAGES_ROUTES } from './pages.routes';

// TEMPORAL
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GarficaDonaComponent } from '../components/garfica-dona/garfica-dona.component';

// graficas
import { ChartsModule } from 'ng2-charts';

// setting del usuario
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GarficaDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]

})

export class PagesModule { }
