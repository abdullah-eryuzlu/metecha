import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {NurseService} from '../../shared/nurse.service';
import {AuthorizedNurseServiceService} from '../../shared/authorizedNurseService.service';
import {PatientService} from '../../shared/patient.service';

@Component({
  selector: 'app-authorized-nurses',
  templateUrl: './authorized-nurses.component.html',
  styleUrls: ['./authorized-nurses.component.css']
})
export class AuthorizedNursesComponent implements OnInit {
    listData: MatTableDataSource<any>;
    searchKey: string;
    displayedColumns: string[] = ['name', 'surname', 'actions'];
    userId: string;

    constructor(public service: AuthorizedNurseServiceService,
                public nurseService: NurseService,
                public patientService: PatientService,
                public dialogRef: MatDialogRef<AuthorizedNursesComponent>) { }

    ngOnInit() {
    }

    onClear() {
        this.service.form.reset();
        this.service.initializeFormGroup();
    }

    onDelete(nurseId) {
        if (confirm('Are you sure to delete this relation?')) {
            this.nurseService.deleteAuthorizedNurse(nurseId, this.userId);
        }
        this.onClose();
    }

    onClose() {
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.dialogRef.close();
    }

}
