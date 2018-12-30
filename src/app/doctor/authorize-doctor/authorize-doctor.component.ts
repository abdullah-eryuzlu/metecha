import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatTableDataSource} from '@angular/material';
import {AuthorizedDoctorService} from '../../shared/authorized-doctor.service';

@Component({
  selector: 'app-authorize-doctor',
  templateUrl: './authorize-doctor.component.html',
  styleUrls: ['./authorize-doctor.component.css']
})
export class AuthorizeDoctorComponent implements OnInit {

    listData;
    constructor(public service: AuthorizedDoctorService,
                public dialogRef: MatDialogRef<AuthorizeDoctorComponent>) { }

    ngOnInit() {
        this.service.getDoctors().subscribe(res =>{
            if(res['status'] == 200){
                this.service.array = res['body'];
                this.listData = new MatTableDataSource<any>(this.service.array);
            }
        });
    }

    onSubmit() {
        if (this.service.form.valid) {
            this.service.addDoctor(this.service.form.value);
            this.service.form.reset();
            this.service.initializeFormGroup();
            this.onClose();
        }

    }

    onClose() {
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.dialogRef.close();
        setTimeout(function () {
            window.location.reload();
        }, 500);
    }




}
