import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // TRABAJAR CON FORMULARIOS

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// RUTAS
import { APP_ROUTES } from './app.routes';

// MODULO PAGES
import { PagesModule } from './pages/pages.module';
import { GarficaDona2Component } from './components/garfica-dona2/garfica-dona2.component';
// import { GarficaDonaComponent } from './components/garfica-dona/garfica-dona.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GarficaDona2Component
    // GarficaDonaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
