import { Component, OnInit } from '@angular/core';
import {ChangePasswordService} from '../../../shared/change-password.service';
import {MatDialogRef} from '@angular/material';
import {AuthenticationService} from '../../../shared/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public service: ChangePasswordService,
              public authService: AuthenticationService,
              public dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit() {
  }

    onClear() {
        this.service.form.reset();
        this.service.initializeFormGroup();
    }

    onSubmit() {
        if (this.service.form.valid) {
            this.service.changePassword(this.service.form.value).subscribe(res => {
                if(res['status'] == 200) {
                    this.onClose();
                    this.authService.logOut();
                }
            });
            this.service.form.reset();
            this.service.initializeFormGroup();
        }
    }

    onClose() {
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.dialogRef.close();
    }

}
