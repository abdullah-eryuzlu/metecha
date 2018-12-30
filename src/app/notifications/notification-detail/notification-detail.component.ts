import { Component, OnInit } from '@angular/core';
import {RecordsService} from '../../shared/records.service';
import {MatDialogRef} from '@angular/material';
import {AuthenticationService} from '../../shared/authentication.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {

    searchKey: string;
    diagnostic: string;
    patient: string;

    constructor(public authService: AuthenticationService,
                public service: RecordsService,
                public dialogRef: MatDialogRef<NotificationDetailComponent>) {
    }

    ngOnInit() {
        console.log(this.patient);
        console.log(this.diagnostic);
        document.getElementById("patient").innerHTML="Patient : "+this.patient;
        document.getElementById("diagnostic").innerHTML="Diagnostic : "+this.diagnostic;


    }
    onClose() {
        this.dialogRef.close();
    }
}