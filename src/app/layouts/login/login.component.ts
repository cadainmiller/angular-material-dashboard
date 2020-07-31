import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ForgotPasswordComponent } from '../../shared/dialog/forgot-password/forgot-password.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      this.authService.validate(this.form.value.username, this.form.value.password)
        .then((response) => {
          this.authService.setUserInfo({ 'user': response['user'] });
          this.router.navigate(['home']);
        })
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

