import { Component, OnInit } from '@angular/core';
import {PatientService} from '../shared/patient.service';
import {MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource} from '@angular/material';
import {RecordsService} from '../shared/records.service';
import {AuthenticationService} from '../shared/authentication.service';
import {DoctorService} from '../shared/doctor.service';
import {NotificationsService} from '../shared/notifications.service';
import {SendNotificationComponent} from './send-notification/send-notification.component';
import {NotificationDetailComponent} from './notification-detail/notification-detail.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {


    constructor(public service: NotificationsService,
                public patientService: PatientService,
                public recordService: RecordsService,
                public doctorService: DoctorService,
                public authService: AuthenticationService,
                public dialog: MatDialog) { }


    listData: MatTableDataSource<any>;
    searchKey: string;
    displayedColumns: string[] = ['notificationFrom'];

    ngOnInit() {

        this.authService.getType().subscribe( res=> {
            if(res['status'] == 401){
                window.location.href='/login';
            }
        });
        this.service.getNotifications().subscribe(res => {
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
        this.dialog.open(SendNotificationComponent, dialogConfig);
    }

    openDetail(notifId){
        this.service.getNotification(notifId).subscribe(res => {
            if (res['status'] == 200) {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = true;
                dialogConfig.width = '40%';
                dialogConfig.height = '40%';
                const dialogRef: MatDialogRef<NotificationDetailComponent> = this.dialog.open(NotificationDetailComponent, dialogConfig);
                dialogRef.componentInstance.diagnostic = res['body']['record']['diagnostic'];
                dialogRef.componentInstance.patient = res['body']['record']['patient'];
            }
        });
    }
}
