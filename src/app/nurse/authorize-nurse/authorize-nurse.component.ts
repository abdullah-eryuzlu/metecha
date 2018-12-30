import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatTableDataSource} from '@angular/material';
import {PatientService} from '../../shared/patient.service';
import {NurseService} from '../../shared/nurse.service';
import {AuthorizedNurseServiceService} from '../../shared/authorizedNurseService.service';

@Component({
  selector: 'app-authorize-nurse',
  templateUrl: './authorize-nurse.component.html',
  styleUrls: ['./authorize-nurse.component.css']
})
export class AuthorizeNurseComponent implements OnInit {
    listData: MatTableDataSource<any>;
    searchKey: string;
    displayedColumns: string[] = ['patientName', 'diagnostic', 'actions'];
    userId: string;

    constructor(public service: AuthorizedNurseServiceService,
                public nurseService: NurseService,
                public patientService: PatientService,
                public dialogRef: MatDialogRef<AuthorizeNurseComponent>) { }

    ngOnInit() {
        this.nurseService.getNurses().subscribe(res =>{
            if(res['status'] == 200){
                this.nurseService.array =  res['body'];
            }
        });
        this.patientService.getAuthorizedPatients().subscribe(res =>{

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
            this.service.authorizeNurse(this.service.form.value);
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
