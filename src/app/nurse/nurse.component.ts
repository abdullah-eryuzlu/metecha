import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NurseService} from '../shared/nurse.service';
import {AuthorizeNurseComponent} from './authorize-nurse/authorize-nurse.component';
import {PatientService} from '../shared/patient.service';
import {AuthorizedNurseServiceService} from '../shared/authorizedNurseService.service';


@Component({
    selector: 'app-nurse',
    templateUrl: './nurse.component.html',
    styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

    constructor(public nurseService: NurseService,
                public service: AuthorizedNurseServiceService,
                public patientService: PatientService,
                public dialog: MatDialog) { }

    listData: MatTableDataSource<any>;
    searchKey: string;
    displayedColumns: string[] = ['nurseName', 'patientName', 'actions'];

    ngOnInit() {
        this.service.getAuthorizedNurses().subscribe(res => {
            if (res['status'] == 200) {
                this.service.array = res['body'];
                this.listData = new MatTableDataSource<any>(this.service.array);
            }
        });
    }

    onSearchClear() {
        this.searchKey = '';
    }

    applyFilter() {
        this.listData.filter = this.searchKey.trim().toLowerCase();
    }

    onCreate(){
        this.service.initializeFormGroup();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60%';
        this.dialog.open(AuthorizeNurseComponent, dialogConfig);
    }
}
