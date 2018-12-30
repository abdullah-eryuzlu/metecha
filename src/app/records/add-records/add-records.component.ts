import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../shared/patient.service';
import {MatDialogRef} from '@angular/material';
import {RecordsService} from '../../shared/records.service';

@Component({
  selector: 'app-add-records',
  templateUrl: './add-records.component.html',
  styleUrls: ['./add-records.component.css']
})
export class AddRecordsComponent implements OnInit {

    constructor(public service: RecordsService,
                public patientService: PatientService,
                public dialogRef: MatDialogRef<AddRecordsComponent>) { }


    ngOnInit() {
        this.patientService.getPatients().subscribe(res =>{
            if(res['status'] == 200){
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
    }
}
