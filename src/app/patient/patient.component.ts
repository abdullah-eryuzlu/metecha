import { Component, OnInit } from '@angular/core';
import {PatientService} from '../shared/patient.service';
import {MatDialogRef, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddPatientComponent} from './add-update-patient/add-patient.component';
import {AuthorizeNurseComponent} from '../nurse/authorize-nurse/authorize-nurse.component';
import {AuthorizedNurseServiceService} from '../shared/authorizedNurseService.service';
import {RecordsService} from '../shared/records.service';
import {AuthenticationService} from '../shared/authentication.service';
import {RecordsComponent} from './records/records.component';
import {NurseService} from '../shared/nurse.service';
import {AuthorizedNursesComponent} from './authorized-nurses/authorized-nurses.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(public service: PatientService,
              public dialog: MatDialog,
              public authNurseService: AuthorizedNurseServiceService,
              public recordService: RecordsService,
              public authService: AuthenticationService,
              public nurseService: NurseService) { }


    listData: MatTableDataSource<any>;
    searchKey: string;
    displayedColumns: string[] = ['name', 'surname', 'actions'];
    displayedColumns2: string[] = ['name', 'surname'];
  ngOnInit() {

      this.authService.getType().subscribe( res=> {
          if(res['status'] == 401){
              window.location.href='/login';
          }
      })
      this.service.getAuthorizedPatients().subscribe(res => {
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

    onCreateNurse(){
        this.authNurseService.initializeFormGroup();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60%';
        this.dialog.open(AuthorizeNurseComponent, dialogConfig);
    }
    onCreate(){
        this.service.initializeFormGroup();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60%';
        this.dialog.open(AddPatientComponent, dialogConfig);
    }

    authorizedNurses(userId){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '75%';
        dialogConfig.height = '75%';
        const dialogRef: MatDialogRef<AuthorizedNursesComponent> = this.dialog.open(AuthorizedNursesComponent, dialogConfig);
        this.nurseService.getAuthorizedNurses(userId).subscribe(res => {
            if (res['status'] == 200) {
                this.nurseService.arrayAuthorized = res['body'];
                dialogRef.componentInstance.listData = new MatTableDataSource<any>(this.nurseService.arrayAuthorized);
            } else if (res['status'] === 204 || res['status'] === undefined) {

            } else {
                console.log('failed');
            }
        });
        dialogRef.componentInstance.userId = userId;
    }


    onDelete(userId){
        if(confirm('Are you sure to delete this patient?')) {
            this.service.deletePatient(userId);
        }
        window.location.reload();
    }


    openRecords(userId){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '75%';
        dialogConfig.height = '75%';
        const dialogRef: MatDialogRef<RecordsComponent> = this.dialog.open(RecordsComponent, dialogConfig);
        this.recordService.getRecords(userId).subscribe(res => {
            if (res['status'] == 200) {
                this.recordService.array = res['body'];
                dialogRef.componentInstance.listData = new MatTableDataSource<any>(this.recordService.array);
            }
        });
        dialogRef.componentInstance.userId = userId;
    }
}
