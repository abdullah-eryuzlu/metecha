import { Component, OnInit } from '@angular/core';
import {RelativeService} from '../../shared/relative.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-patient-success-message',
  templateUrl: './add-patient-success-message.component.html',
  styleUrls: ['./add-patient-success-message.component.css']
})
export class AddPatientSuccessMessageComponent implements OnInit {

    username:string;
    password:string;

    constructor(private dialogRef: MatDialogRef<AddPatientSuccessMessageComponent>) { }


    ngOnInit() {
        document.getElementById("message").innerHTML="Dont forget to active your account from email.";
        document.getElementById("username").innerHTML="Username : "+this.username;
        document.getElementById("password").innerHTML="Password : "+this.password;

    }

    onClose() {

        this.dialogRef.close();
    }

}
