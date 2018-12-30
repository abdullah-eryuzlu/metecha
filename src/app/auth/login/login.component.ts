import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/authentication.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthenticationService,
                private dialog: MatDialog) { }

                results = [];
  ngOnInit() {
  }


  onLogin() {
      if (this.authService.form.valid) {
              this.authService.login(this.authService.form.value).subscribe(res => {
                  if(res['status'] == 200){
                      //this.authService.isLogin = true;
                      window.location.href = '/';
                  }
              });
              this.authService.form.reset();
              this.authService.initializeFormGroup();
      }

  }
  forgotPassword(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '75%';
      dialogConfig.height = '75%';
      const dialogRef: MatDialogRef<ForgotPasswordComponent> = this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }

}
