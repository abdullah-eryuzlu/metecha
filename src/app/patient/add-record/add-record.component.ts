import { Component, OnInit } from '@angular/core';
import {RecordsService} from '../../shared/records.service';
import {PatientService} from '../../shared/patient.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

    userId: string ;
    constructor(public service: RecordsService,
                public patientService: PatientService,
                public dialogRef: MatDialogRef<AddRecordComponent>) { }


    ngOnInit() {
        this.patientService.getPatients().subscribe(res =>{
            if (res['status'] == 200){
                this.patientService.array =  res['body'];
            }
        });
    }

    onClear() {
        this.service.form.reset();
        this.service.initializeFormGroup();
    }

    onSubmit() {
        if (this.service.form.valid) {
            this.service.addRecords(this.service.form.value);
            this.service.form.reset();
            this.service.initializeFormGroup();
            this.onClose();
        }
    }

    onClose() {
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.dialogRef.close();
        setTimeout(function () {
            window.location.reload();
        }, 500);
    }
}
