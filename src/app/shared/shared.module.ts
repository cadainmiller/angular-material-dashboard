import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { HighchartsChartModule } from 'highcharts-angular';

import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AreaComponent } from './widgets/area/area.component';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';
import { ModalComponent } from './dialog/modal/modal.component';
import { ForgotPasswordComponent } from './dialog/forgot-password/forgot-password.component';
import { EmployeeTableComponent } from './widgets/employee-table/employee-table.component';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    ModalComponent,
    EmployeeTableComponent,
    ForgotPasswordComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    FlexLayoutModule,
    MatGridListModule,
    MatTableModule,
    HighchartsChartModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    ModalComponent,
    EmployeeTableComponent,
    ForgotPasswordComponent
  ],
  entryComponents: [ModalComponent]
})
export class SharedModule { }
