import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource} from '@angular/material';
import {RecordsService} from '../../shared/records.service';
import {AuthenticationService} from '../../shared/authentication.service';
import {AddRecordComponent} from '../add-record/add-record.component';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

    listData: MatTableDataSource<any>;
    searchKey: string;
    displayedColumns: string[] = ['patientName', 'diagnostic'];
    userId: string;

    constructor(public authService: AuthenticationService,
                public service: RecordsService,
                public dialogRef: MatDialogRef<RecordsComponent>,
                public dialog: MatDialog) {
    }

    ngOnInit() {

    }

    onClear() {

    }

    onDelete(recordId){
        if(confirm('Are you sure to delete this record?')) {
            this.service.deleteRecord(recordId);
        }
    }

    onCreate(){
        this.service.initializeFormGroup();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60%';
        const dialogRef: MatDialogRef<AddRecordComponent> = this.dialog.open(AddRecordComponent, dialogConfig);
        dialogRef.componentInstance.userId = this.userId;
    }


    onClose() {
        this.dialogRef.close();
    }
}
