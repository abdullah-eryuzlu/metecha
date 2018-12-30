import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {DoctorService} from '../shared/doctor.service';
import {AuthorizeDoctorComponent} from './authorize-doctor/authorize-doctor.component';
import {AuthorizedDoctorService} from '../shared/authorized-doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

    constructor(public service: AuthorizedDoctorService,
                public doctorService: DoctorService,
                public dialog: MatDialog) { }

    listData: MatTableDataSource<any>;
    searchKey: string;
    displayedColumns: string[] = ['name','surname','email', 'actions'];
    array;

    ngOnInit() {
        this.doctorService.getAuthorizedDoctors().subscribe(res => {
            if (res['status'] == 200) {
                this.doctorService.array = res['body'];
                this.listData = new MatTableDataSource<any>(this.doctorService.array);
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
        this.dialog.open(AuthorizeDoctorComponent, dialogConfig);
    }


    onDelete(userId) {
        if(confirm("Are you sure to delete relation of doctor?")) {
            this.doctorService.deleteDoctor(userId);
            window.location.reload();
        }
    }

}
