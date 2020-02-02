import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule } from '@angular/common';
import { BootstrapModalModule } from 'ngx-bootstrap-modal';
import { ModalModule } from 'ngx-bootstrap/modal';

import { RoleListComponent } from './role-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [RoleListComponent],
  imports: [
    NbCardModule,
    ThemeModule,
    BootstrapModalModule,
    ModalModule,
    CommonModule,
    Ng2SmartTableModule
  ],
})
export class RoleListModule { }
