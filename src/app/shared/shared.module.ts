import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    NopagefoundComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    NopagefoundComponent
  ]
})
export class SharedModule { }
