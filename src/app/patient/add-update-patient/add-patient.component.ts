import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../shared/patient.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {AddPatientSuccessMessageComponent} from '../add-patient-success-message/add-patient-success-message.component';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})

export class AddPatientComponent implements OnInit {

    constructor(public service: PatientService,
                public dialogRef: MatDialogRef<AddPatientComponent>,
                public dialog: MatDialog) { }

  ngOnInit() {
  }
    onClear() {
        this.service.form.reset();
        this.service.initializeFormGroup();
    }

    onSubmit() {
        if (this.service.form.valid) {
            this.service.addPatient(this.service.form.value).subscribe(res => {
                if (res['status'] == 200) {
                    this.service.id = res['body']['username'];
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.disableClose = true;
                    dialogConfig.autoFocus = true;
                    dialogConfig.width = '30%';
                    dialogConfig.height = '30%';
                    const dialogRef: MatDialogRef<AddPatientSuccessMessageComponent> =
                        this.dialog.open(AddPatientSuccessMessageComponent, dialogConfig);
                    dialogRef.componentInstance.username = this.service.id;
                    dialogRef.componentInstance.password = this.service.pw;
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
