import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SettingService, SidebarService, SharedService, SubirArchivoService } from './service.index';

import { LoginGuardGuard } from './guards/login-guard.guard';

@NgModule({
  declarations: [],
  providers: [
    SettingService,
    SidebarService,
    SharedService,
    LoginGuardGuard,
    // SubirArchivoService
    // UsuarioService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // LoginGuardGuard
  ]
})
export class ServiceModule { }
