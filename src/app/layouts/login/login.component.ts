import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ForgotPasswordComponent } from '../../shared/dialog/forgot-password/forgot-password.component'
import { FakeService } from 'src/app/services/fake.service'
import { Users } from 'src/app/model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog, private fs : FakeService) { }
  ngOnInit(): void {
    this.fs.getUsers().subscribe
    (
      (response)=>
      {
        console.log(response)
      },
      (error) => console.log(error)
    )
  }
  

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }


  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "50%";
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }

}

