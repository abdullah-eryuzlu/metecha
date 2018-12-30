import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../shared/doctor.service';
import {PatientService} from '../../shared/patient.service';
import {RecordsService} from '../../shared/records.service';
import {AuthenticationService} from '../../shared/authentication.service';
import {NotificationsService} from '../../shared/notifications.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {

    selected;
  constructor(public service: NotificationsService,
              public doctorService: DoctorService,
              public patientService: PatientService,
              public recordService: RecordsService,
              public dialogRef: MatDialogRef<SendNotificationComponent>) { }

  ngOnInit() {
      this.doctorService.getDoctors().subscribe(res =>{
          if(res['status'] == 200){
              this.doctorService.array =  res['body'];
          }
      });
      this.patientService.getAuthorizedPatients().subscribe(res =>{

          if(res['status'] == 200){
              this.patientService.array =  res['body'];
          }
      });

  }

  onSubmit(){
      if (this.service.form.valid) {
          this.service.sendNotification(this.service.form.value);
          this.service.initializeFormGroup();
          this.onClose();
      }
  }

  makeEmptyRecords(){
      this.recordService.array = undefined;
  }

  printRecords(userId){
      this.recordService.getRecords(userId).subscribe(res => {
          if (res['status'] == 200) {
              this.recordService.array = res['body'];
          }
      });
  }
  onClose() {
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.dialogRef.close();
      this.makeEmptyRecords();
  }

}
