import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingService, SidebarService, SharedService } from './service.index';

@NgModule({
  declarations: [],
  providers: [
    SettingService,
    SidebarService,
    SharedService
  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule { }
