import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/authentication.service';
import {ForgotpasswordService} from '../../shared/forgotpassword.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    constructor(public service: ForgotpasswordService,
                public authService: AuthenticationService,
                public dialogRef: MatDialogRef<ForgotPasswordComponent>) { }

    ngOnInit() {
    }

    onClear() {
        this.service.form.reset();
        this.service.initializeFormGroup();
    }

    onSubmit() {
        if (this.service.form.valid) {
            this.service.sendEmail(this.service.form.value);
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
