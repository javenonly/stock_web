import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserRoutingModule } from './user-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';
import { NbCardModule, NbIconModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
// import { TablesRoutingModule, routedComponents } from './tables-routing.module';
// import { FsIconComponent } from './tree-grid/tree-grid.component';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    UserRoutingModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    ThemeModule,
    // TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    UserCreateComponent,
    UserListComponent,
    UserComponent
  ],
})
export class UserModule { }
