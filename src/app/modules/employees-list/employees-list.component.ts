import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/dialog/modal/modal.component'
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  constructor(private dialog: MatDialog) {

  }
  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(ModalComponent);
  }
}
