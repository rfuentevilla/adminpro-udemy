import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// ==================================
// GUARDS
// ==================================
import { LoginGuardGuard, AdminGuard } from '../services/service.index';

// ==================================
// MANTENIMIETTS
// ==================================
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }  },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' }  },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }  },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }  },
            { path: 'account-setting', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' }  },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' }  },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' }  },

            // MANTENIMIENTOS
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [ AdminGuard ],
                data: { titulo: 'Mantenimiento de usuario' }
            },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' }  },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' }  },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' }  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
