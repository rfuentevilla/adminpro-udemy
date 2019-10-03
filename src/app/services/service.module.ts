import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SettingService, SidebarService, SharedService } from './service.index';

import { LoginGuardGuard } from './guards/login-guard.guard';

@NgModule({
  declarations: [],
  providers: [
    SettingService,
    SidebarService,
    SharedService,
    LoginGuardGuard
    // UsuarioService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // LoginGuardGuard
  ]
})
export class ServiceModule { }
