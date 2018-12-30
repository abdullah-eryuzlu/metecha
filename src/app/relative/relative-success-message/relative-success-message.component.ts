import { Component, OnInit } from '@angular/core';
import {RelativeService} from '../../shared/relative.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-relative-success-message',
  templateUrl: './relative-success-message.component.html',
  styleUrls: ['./relative-success-message.component.css']
})
export class RelativeSuccessMessageComponent implements OnInit {

    username:string;
    password:string;

    constructor(public service: RelativeService,
                public dialogRef: MatDialogRef<RelativeSuccessMessageComponent>) { }


    ngOnInit() {
        console.log("success message username is : " + this.service.id);
        document.getElementById("username").innerHTML = "Username : " + this.username;
        document.getElementById("password").innerHTML = "Password : " + this.password;
        document.getElementById("message").innerHTML = "Dont forget to active your account from email.";
    }

    onClose() {
        this.dialogRef.close();
        setTimeout(function () {
            window.location.reload();
        }, 500);
    }

}
