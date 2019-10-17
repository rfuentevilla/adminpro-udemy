import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // TRABAJAR CON FORMULARIOS

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// RUTAS
import { APP_ROUTES } from './app.routes';

// servicios
// import { SettingService } from './services/setting.service';

// MODULO PAGES
import { PagesModule } from './pages/pages.module';
import { GarficaDona2Component } from './components/garfica-dona2/garfica-dona2.component';
// import { HttpClientModule } from '@angular/common/http';

// MODULO DE SERVICIOS
import { ServiceModule } from './services/service.module';

// import { ImagenPipe } from './pipes/imagen.pipe';
// import { GarficaDonaComponent } from './components/garfica-dona/garfica-dona.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GarficaDona2Component
    // ImagenPipe
    // GarficaDonaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    ReactiveFormsModule,
    FormsModule,
    // HttpClientModule
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
